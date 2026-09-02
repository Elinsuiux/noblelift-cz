<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- The application is this Next.js 16 (Turbopack + `next-intl`) app in `web/`. All dev commands run from `web/`. The top-level `prototype/` folder is only a static HTML mockup, not the app.
- Dev server: `npm run dev` (see `web/README.md`). It serves on `http://localhost:3000`; `/` returns a 307 redirect to a locale. Supported locales are `cz` and `en` (e.g. `/cz`, `/en`).
- Use `npm install` (the update script already does this). Do NOT use `npm ci`: the committed lockfile is out of sync (missing `@swc/helpers`) so `npm ci` fails.
- The contact form (`POST /api/contact`) uses Resend. Without `RESEND_API_KEY`, submissions succeed in dev as a no-op (logs a warning, returns `{"ok":true}`) — no secret is required to exercise the form. Set `RESEND_API_KEY` (optionally `CONTACT_EMAIL_FROM`/`CONTACT_EMAIL_TO`) in `web/.env.local` to actually send email.
- `npm run lint` currently reports pre-existing errors/warnings; these do not block `npm run build` (Next 16 does not run ESLint during build). `npm run build` compiles and passes TypeScript cleanly. The stale `tsc-out.txt` at the repo root is an old Windows artifact and does not reflect current build status.
- PDF spec sheets are generated on demand at `/api/documents/*` (e.g. `/api/documents/serie-a-technicke-parametry`).
