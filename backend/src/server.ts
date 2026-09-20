import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import mongoose, { Schema } from 'mongoose'
import { z } from 'zod'

const elementSchema = z.object({
  id: z.string().min(1), type: z.enum(['rectangle', 'circle', 'text']), x: z.number().finite(), y: z.number().finite(), width: z.number().positive().max(2000), height: z.number().positive().max(2000), rotation: z.number().finite().min(-360).max(360), fill: z.string().regex(/^#[0-9a-f]{6}$/i), text: z.string().max(500).optional(), fontSize: z.number().min(8).max(240).optional(),
}).superRefine((element, ctx) => { if (element.type === 'text' && !element.text) ctx.addIssue({ code: 'custom', path: ['text'], message: 'Text content is required for text elements.' }) })
const canvasSchema = z.object({ name: z.string().trim().min(1).max(120), elements: z.array(elementSchema).max(500) })
const Canvas = mongoose.model('Canvas', new Schema({ name: { type: String, required: true, trim: true, maxlength: 120 }, elements: { type: [Schema.Types.Mixed], required: true, default: [] } }, { timestamps: true }))

const app = express()
app.use(cors({ origin: process.env.FRONTEND_URL?.split(',').map((value) => value.trim()) ?? true }))
app.use(express.json({ limit: '1mb' }))
app.get('/health', (_req, res) => res.json({ data: { status: 'ok' } }))

function idParam(req: Request, res: Response) { const id = req.params.id; if (!mongoose.isValidObjectId(id)) { res.status(400).json({ message: 'Invalid canvas id.' }); return null } return id }
function parseBody(req: Request, res: Response) { const result = canvasSchema.safeParse(req.body); if (!result.success) { res.status(400).json({ message: 'Invalid canvas data.', issues: result.error.issues }); return null } return result.data }
function serialize(doc: any) { return { id: doc._id.toString(), name: doc.name, elements: doc.elements, createdAt: doc.createdAt, updatedAt: doc.updatedAt } }

app.post('/api/canvases', async (req, res, next) => { try { const body = parseBody(req, res); if (!body) return; const canvas = await Canvas.create(body); res.status(201).json({ data: serialize(canvas) }) } catch (error) { next(error) } })
app.get('/api/canvases', async (_req, res, next) => { try { const canvases = await Canvas.find().sort({ updatedAt: -1 }).lean(); res.json({ data: canvases.map(serialize) }) } catch (error) { next(error) } })
app.get('/api/canvases/:id', async (req, res, next) => { try { const id = idParam(req, res); if (!id) return; const canvas = await Canvas.findById(id).lean(); if (!canvas) { res.status(404).json({ message: 'Canvas not found.' }); return } res.json({ data: serialize(canvas) }) } catch (error) { next(error) } })
app.put('/api/canvases/:id', async (req, res, next) => { try { const id = idParam(req, res); if (!id) return; const body = parseBody(req, res); if (!body) return; const canvas = await Canvas.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean(); if (!canvas) { res.status(404).json({ message: 'Canvas not found.' }); return } res.json({ data: serialize(canvas) }) } catch (error) { next(error) } })
app.delete('/api/canvases/:id', async (req, res, next) => { try { const id = idParam(req, res); if (!id) return; const deleted = await Canvas.findByIdAndDelete(id); if (!deleted) { res.status(404).json({ message: 'Canvas not found.' }); return } res.status(204).send() } catch (error) { next(error) } })
app.use((_req, res) => res.status(404).json({ message: 'Route not found.' }))
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => { console.error('[api]', error); if (res.headersSent) return; res.status(500).json({ message: 'Unexpected server error.' }) })

const port = Number(process.env.PORT ?? 4000)
const mongoUri = process.env.MONGODB_URI
if (!mongoUri) console.warn('MONGODB_URI is not set. The Express server will not start.')
else mongoose.connect(mongoUri).then(() => app.listen(port, () => console.log(`API listening on ${port}`))).catch((error) => { console.error('MongoDB connection failed', error); process.exit(1) })

export default app
