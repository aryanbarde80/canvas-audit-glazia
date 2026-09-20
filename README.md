# Design Canvas

Design Canvas is a premium, browser-based 2D canvas editor built with Next.js, React Konva, Express, and MongoDB. Create canvases, add and transform elements, edit precise properties, and persist work through a validated REST API.

## Features

- Select, drag, resize, rotate, and delete canvas elements.
- Add rectangles, circles, triangles, and text layers.
- Edit geometry, rotation, color, text, and font size from the inspector.
- Save new canvases and update existing canvases without duplicating them.
- Load and delete persisted canvases from the studio.
- Keyboard shortcuts for delete, undo, and redo.
- Dedicated documentation at `/docs`.
- Responsive dark studio UI with zoom controls and selection-friendly interaction states.

## Architecture

- `app/` — Next.js App Router pages, including the studio and `/docs`.
- `components/canvas/` — canvas editor, Konva stage, toolbar, inspector, header, and load dialog.
- `lib/canvas-types.ts` — shared types, validation helpers, and API client.
- `backend/src/server.ts` — Express REST API with Zod validation and Mongoose persistence.

The frontend communicates with the backend through the API client and does not use localStorage for canvas persistence.

## Local development

Install dependencies with the repository package manager:

```bash
pnpm install
```

Run the Next.js frontend:

```bash
pnpm dev
```

Run the Express API in a second terminal:

```bash
pnpm backend
```

The frontend expects the API at `NEXT_PUBLIC_API_URL`, defaulting to `http://localhost:4000/api`. Configure MongoDB with `MONGODB_URI` and optionally set `PORT` for the API server. See `backend/.env.example` for the backend variables.

## Validation

Before deploying, run:

```bash
pnpm build
```

The production deployment should run the Next.js app. The Express API requires a separately hosted Node process or a compatible server runtime with the MongoDB environment variables configured.

## Deployment

This repository is connected to Vercel. Preview and production deployments build the Next.js frontend with `pnpm build`. Configure `NEXT_PUBLIC_API_URL` to point to the deployed Express API, and configure the backend's `MONGODB_URI`, `CLIENT_ORIGIN`, and `PORT` in the API host environment.

For the full product guide, open the in-app [documentation page](/docs).

## Continue with v0

[Open the v0 project](https://v0.app/chat/projects/prj_BRptWpObzZo0jqIvo9U8Dm9t69YA) to continue developing the repository.

## License

Private project.

## GitHub

Changes are synchronized through the repository's connected v0 Git workflow. Never commit access tokens or environment files to source control.

Co-authored-by: v0 <it+v0agent@vercel.com>

## Built with

- Next.js
- React
- React Konva
- Express
- MongoDB / Mongoose
- Tailwind CSS
- Vercel

The project started from a v0-generated Next.js application and has been extended into a persistent canvas editor.

## Learn more

- [Next.js](https://nextjs.org/docs)
- [React Konva](https://konvajs.org/docs/react/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/docs/)
- [Vercel](https://vercel.com/docs)

## Troubleshooting

If the frontend cannot load or save canvases, verify that the Express API is running and that `NEXT_PUBLIC_API_URL` points to its `/api` base URL. If the API returns a database error, verify `MONGODB_URI` and the network access rules for the MongoDB deployment.

If a deployment fails during compilation, run `pnpm build` locally and inspect the first TypeScript or JSX error; later errors are often cascading parser errors.

## API overview

- `GET /api/health` — health check.
- `GET /api/canvases` — list canvases.
- `POST /api/canvases` — create a canvas.
- `GET /api/canvases/:id` — load one canvas.
- `PUT /api/canvases/:id` — update a canvas.
- `DELETE /api/canvases/:id` — delete a canvas.

All write payloads are validated before MongoDB persistence, and API errors are returned as JSON with an actionable message.

## Accessibility

The editor uses semantic controls, visible keyboard focus states, descriptive labels, and accessible dialog structure. The canvas remains usable with the inspector for precise edits when drag or transform interaction is not ideal.

## Project status

The studio is an active product prototype focused on reliable canvas editing and a polished interaction model.
