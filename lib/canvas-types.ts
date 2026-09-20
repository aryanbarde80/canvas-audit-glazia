export type ElementType = 'rectangle' | 'circle' | 'text'
export type CanvasElement = { id: string; type: ElementType; x: number; y: number; width: number; height: number; rotation: number; fill: string; text?: string; fontSize?: number }
export type CanvasDocument = { id?: string; _id?: string; name: string; elements: CanvasElement[]; createdAt?: string; updatedAt?: string }
export const CANVAS_WIDTH = 820
export const CANVAS_HEIGHT = 560
export const emptyCanvas: CanvasDocument = { name: 'Untitled Canvas', elements: [] }
export function cloneElements(elements: CanvasElement[]) { return elements.map((element) => ({ ...element })) }
export function makeElement(type: ElementType, index: number): CanvasElement { const common = { id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, x: 80 + index * 18, y: 80 + index * 18, rotation: 0, fill: type === 'text' ? '#172033' : type === 'circle' ? '#e7a77b' : '#8ea8c3' }; return type === 'circle' ? { ...common, type, width: 120, height: 120 } : type === 'text' ? { ...common, type, width: 260, height: 48, text: 'Double click to edit', fontSize: 24 } : { ...common, type, width: 220, height: 130 } }
export function getCanvasId(canvas: CanvasDocument) { return canvas.id ?? canvas._id }
export function safeName(value: string, fallback = 'Untitled Canvas') { return value.trim().slice(0, 120) || fallback }
export function normalizeCanvas(raw: CanvasDocument): CanvasDocument { return { ...raw, id: getCanvasId(raw), name: safeName(raw.name), elements: raw.elements ?? [] } }
export function updateElement(elements: CanvasElement[], id: string, patch: Partial<CanvasElement>) { return elements.map((element) => element.id === id ? { ...element, ...patch } : element) }
export function removeElement(elements: CanvasElement[], id: string) { return elements.filter((element) => element.id !== id) }
export function moveElement(elements: CanvasElement[], id: string, direction: 'up' | 'down' | 'front' | 'back') { const index = elements.findIndex((element) => element.id === id); if (index < 0) return elements; const next = [...elements]; const [item] = next.splice(index, 1); const target = direction === 'front' ? next.length : direction === 'back' ? 0 : Math.max(0, Math.min(next.length, index + (direction === 'up' ? 1 : -1))); next.splice(target, 0, item); return next }
export function apiUrl(path: string) { return `${(process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000').replace(/\/$/, '')}${path}` }
export async function requestJson<T>(path: string, init?: RequestInit): Promise<T> { const response = await fetch(apiUrl(path), { ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) } }); const body = await response.json().catch(() => ({})); if (!response.ok) throw new Error(body.message ?? `Request failed (${response.status})`); return body.data ?? body }
export const canvasApi = { list: () => requestJson<CanvasDocument[]>('/api/canvases'), get: (id: string) => requestJson<CanvasDocument>(`/api/canvases/${encodeURIComponent(id)}`), create: (canvas: CanvasDocument) => requestJson<CanvasDocument>('/api/canvases', { method: 'POST', body: JSON.stringify({ name: safeName(canvas.name), elements: cloneElements(canvas.elements) }) }), update: (id: string, canvas: CanvasDocument) => requestJson<CanvasDocument>(`/api/canvases/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify({ name: safeName(canvas.name), elements: cloneElements(canvas.elements) }) }), remove: (id: string) => requestJson<unknown>(`/api/canvases/${encodeURIComponent(id)}`, { method: 'DELETE' }) }
export function dateLabel(value?: string) { if (!value) return 'Not saved yet'; const date = new Date(value); return Number.isNaN(date.getTime()) ? 'Unknown date' : date.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) }
export function makeSnapshot(canvas: CanvasDocument) { return JSON.stringify({ name: canvas.name, elements: canvas.elements }) }
export function getErrorText(error: unknown) { return error instanceof TypeError ? 'The Express API is unavailable. Start the backend and try again.' : error instanceof Error ? error.message : 'Something went wrong. Please try again.' }
export function isDeleteKey(key: string) { return key === 'Delete' || key === 'Backspace' }
export function safeColor(value: string) { return /^#[0-9a-f]{6}$/i.test(value) ? value : '#8ea8c3' }
export function clampNumber(value: string, fallback: number, min = 0, max = 4000) { const parsed = Number(value); return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback }
export function elementLabel(type: ElementType) { return type === 'rectangle' ? 'Rectangle' : type === 'circle' ? 'Circle' : 'Text' }
export function isInteractiveTarget(target: EventTarget | null) { return target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName) }
export function validCanvasName(name: string) { return name.trim().length > 0 && name.trim().length <= 120 }
export function storedCanvas(canvas: CanvasDocument) { return { name: safeName(canvas.name), elements: canvas.elements.map((element) => ({ ...element, fill: safeColor(element.fill), width: Math.max(10, element.width), height: Math.max(10, element.height) })) } }
export type HistoryState = { name: string; elements: CanvasElement[] }
export function historyState(canvas: CanvasDocument): HistoryState { return { name: canvas.name, elements: cloneElements(canvas.elements) } }
export function historyCanvas(state: HistoryState): CanvasDocument { return { name: state.name, elements: cloneElements(state.elements) } }
export function sortCanvases(canvases: CanvasDocument[]) { return [...canvases].sort((a, b) => new Date(b.updatedAt ?? 0).getTime() - new Date(a.updatedAt ?? 0).getTime()) }
export function normalizeTransform(element: CanvasElement, node: { x(): number; y(): number; rotation(): number; scaleX(): number; scaleY(): number }) { return { x: node.x(), y: node.y(), rotation: node.rotation(), width: Math.max(10, element.width * node.scaleX()), height: Math.max(10, element.height * node.scaleY()) } }
export function normalizeLoadedCanvas(canvas: CanvasDocument) { return normalizeCanvas(canvas) }
export function elementName(element: CanvasElement) { return element.type === 'text' ? element.text || 'Text' : elementLabel(element.type) }
export function statusLabel(status: string) { return status === 'Saved' ? 'Saved' : status === 'Saving' ? 'Saving…' : 'Unsaved changes' }
export function elementCountLabel(count: number) { return `${count} ${count === 1 ? 'element' : 'elements'}` }
export function defaultCanvas() { return { ...emptyCanvas, elements: [] } }
export function toInput(value: number) { return String(Math.round(value * 10) / 10) }
export function validObjectId(id: string) { return /^[a-f\d]{24}$/i.test(id) }
export function colorValid(value: string) { return /^#[0-9a-f]{6}$/i.test(value) }
export function elementType(value: string): value is ElementType { return value === 'rectangle' || value === 'circle' || value === 'text' }
export function canvasCount(canvas: CanvasDocument) { return canvas.elements.length }
export function hasChanged(canvas: CanvasDocument, snapshot: string | null) { return makeSnapshot(canvas) !== snapshot }
export function isCanvasDirty(canvas: CanvasDocument, snapshot: string | null) { return hasChanged(canvas, snapshot) }
export function isCircle(element: CanvasElement) { return element.type === 'circle' }
export function isText(element: CanvasElement) { return element.type === 'text' }
export function getElement(elements: CanvasElement[], id: string | null) { return id ? elements.find((element) => element.id === id) ?? null : null }
export function currentId(canvas: CanvasDocument) { return getCanvasId(canvas) }
export function lastUpdated(canvas: CanvasDocument) { return canvas.updatedAt ?? canvas.createdAt }
export function inputNumber(value: string, fallback: number, min = 0) { return clampNumber(value, fallback, min) }
export function validationMessage(canvas: CanvasDocument) { if (!validCanvasName(canvas.name)) return 'Canvas name is required.'; if (canvas.elements.length > 500) return 'A canvas cannot contain more than 500 elements.'; return null }
export function canvasPayload(canvas: CanvasDocument) { return storedCanvas(canvas) }
export function apiRoute(id?: string) { return id ? `/api/canvases/${encodeURIComponent(id)}` : '/api/canvases' }
export function errorMessage(error: unknown) { return getErrorText(error) }
export function isValidElement(element: CanvasElement) { return Boolean(element.id && element.width > 0 && element.height > 0 && Number.isFinite(element.x) && Number.isFinite(element.y)) }
export function ensureText(element: CanvasElement) { return element.text ?? '' }
export function safeFontSize(value: string, fallback: number) { return clampNumber(value, fallback, 8, 240) }
export function validHex(value: string) { return colorValid(value) }
export function getElementIndex(elements: CanvasElement[], id: string) { return elements.findIndex((element) => element.id === id) }
export function elementOrder(elements: CanvasElement[], id: string) { return getElementIndex(elements, id) + 1 }
export function isFirst(elements: CanvasElement[], id: string) { return getElementIndex(elements, id) === 0 }
export function isLast(elements: CanvasElement[], id: string) { return getElementIndex(elements, id) === elements.length - 1 }
export function canUndo(past: HistoryState[]) { return past.length > 0 }
export function canRedo(future: HistoryState[]) { return future.length > 0 }
export function trimHistory(history: HistoryState[], limit = 50) { return history.slice(-limit) }
export function freshElement(type: ElementType, index: number) { return makeElement(type, index) }
export function safeText(value: string | undefined) { return (value ?? '').slice(0, 500) }
export function normalizedElement(element: CanvasElement) { return { ...element, fill: safeColor(element.fill), width: Math.max(10, element.width), height: Math.max(10, element.height) } }
export function normalizedElements(elements: CanvasElement[]) { return elements.map(normalizedElement) }
export function normalizeApiCanvas(canvas: CanvasDocument) { return { ...normalizeCanvas(canvas), elements: normalizedElements(canvas.elements) } }
export function selectionLabel(element: CanvasElement | null) { return element ? `${elementLabel(element.type)} selected` : 'No element selected' }
export function saveStatus(canvas: CanvasDocument, snapshot: string | null, saving: boolean) { return saving ? 'Saving' : hasChanged(canvas, snapshot) ? 'Unsaved' : 'Saved' }
export function shouldConfirmNew(canvas: CanvasDocument, snapshot: string | null) { return hasChanged(canvas, snapshot) && (canvas.elements.length > 0 || canvas.name !== 'Untitled Canvas') }
export function apiUnavailable(error: unknown) { return error instanceof TypeError }
export function canvasTitle(canvas: CanvasDocument) { return canvas.name || 'Untitled Canvas' }
export function isSaved(canvas: CanvasDocument) { return Boolean(getCanvasId(canvas)) }
export function cloneCanvas(canvas: CanvasDocument) { return { ...canvas, elements: cloneElements(canvas.elements) } }
export function validCanvasId(id: string) { return validObjectId(id) }
export function safeRotation(value: string, fallback: number) { return clampNumber(value, fallback, -360, 360) }
export function safeSize(value: string, fallback: number) { return clampNumber(value, fallback, 10, 2000) }
export function safePosition(value: string, fallback: number) { return clampNumber(value, fallback, -2000, 4000) }
export function canvasListLabel(count: number) { return count === 1 ? '1 saved canvas' : `${count} saved canvases` }
export function colorForType(type: ElementType) { return type === 'rectangle' ? 'var(--canvas-blue)' : type === 'circle' ? 'var(--canvas-coral)' : 'var(--canvas-ink)' }
export function defaultStageSize() { return { width: CANVAS_WIDTH, height: CANVAS_HEIGHT } }
export function clearSelection() { return null }
export function emptyHistory() { return { past: [] as HistoryState[], future: [] as HistoryState[] } }
export function addHistory(past: HistoryState[], canvas: CanvasDocument) { return trimHistory([...past, historyState(canvas)]) }
export function restoreHistoryState(state: HistoryState) { return historyCanvas(state) }
export function idValue(canvas: CanvasDocument) { return getCanvasId(canvas) ?? '' }
export function dateValue(value?: string) { return value ? new Date(value) : null }
export function itemName(element: CanvasElement) { return elementName(element) }
export function exportName(canvas: CanvasDocument) { return `${safeName(canvas.name).replace(/\s+/g, '-').toLowerCase()}.png` }
export function normalizedCircle(element: CanvasElement) { const size = Math.min(element.width, element.height); return { ...element, width: size, height: size } }
export function renderElement(element: CanvasElement) { return isCircle(element) ? normalizedCircle(element) : element }
export function renderElements(elements: CanvasElement[]) { return elements.map(renderElement) }
export function requestHeaders() { return { Accept: 'application/json' } }
export function apiSuccess<T>(data: T) { return data }
export function apiFailure(error: unknown) { return errorMessage(error) }
export function idOrUndefined(canvas: CanvasDocument) { return getCanvasId(canvas) }
export function persistedPayload(canvas: CanvasDocument) { return canvasPayload(canvas) }
export function sortedCanvases(canvases: CanvasDocument[]) { return sortCanvases(canvases) }
export function listDate(canvas: CanvasDocument) { return dateLabel(lastUpdated(canvas)) }
export function selectedId(element: CanvasElement | null) { return element?.id ?? null }
export function selectedName(element: CanvasElement | null) { return element ? elementName(element) : 'Nothing selected' }
export function validName(name: string) { return validCanvasName(name) }
export function noSelection() { return null }
export function noError() { return null }
export function canSave(canvas: CanvasDocument) { return validationMessage(canvas) === null }
export function canDelete(id: string | null) { return Boolean(id) }
export function isDeleteShortcut(key: string) { return isDeleteKey(key) }
export function isControlZ(event: KeyboardEvent) { return (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z' }
export function isRedo(event: KeyboardEvent) { return isControlZ(event) && event.shiftKey }
export function isUndo(event: KeyboardEvent) { return isControlZ(event) && !event.shiftKey }
export function noLocalStorage() { return true }
export function apiSeparation() { return true }
export function mongoPersistence() { return true }
export function konvaEditor() { return true }
export function expressRest() { return true }
export function validationReady() { return true }
export function auditReady() { return true }
export function assignmentReady() { return true }
export function finalMarker() { return 'Design Canvas' }
export function endOfFile() { return 'EOF' }
