# Arvan Blog

This readMe is written by AI, but the code itself is maintanable, safe and nice!
Code is written by the creativity and engineering of a human mind, and the speed of an AI mind.

For live preview of the system, visit [arvancloud-interview-task.vercel.app](https://arvancloud-interview-task.vercel.app).

## Quick start

```bash
pnpm install
cp .env.sample .env
# set NEXT_PUBLIC_SERVER_URL=https://dummyjson.com
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Description |
| --- | --- |
| `pnpm dev` | Start development server |
| `pnpm build` | Production build (runs lint + unit tests first via `prebuild`) |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint |
| `pnpm test:unit` | Unit tests (Playwright runner) |
| `pnpm test:e2e` | E2E tests across browsers |
| `pnpm analyze-bundle` | Next.js experimental bundle analyzer |
| `pnpm analyze-coupling` | TypeScript modularity / coupling report (`ts-modularity`) |

---

## Architecture overview

```
app/                    App Router pages, layouts, API route handlers
src/components/ui/      Design-system primitives (Base UI wrappers)
src/components/major/   Shared compositions (table, forms, panel shell)
src/components/{auth,article}/  Feature-level UI
src/hooks/              Domain hooks (actions, lists, auth session)
src/services/api/       HTTP client + React Query services
src/configs/            Validators, table columns, messages, constants
src/types/              Shared TypeScript contracts
src/utils/              Auth helpers, API utilities
middleware.ts           Route protection & redirects
```

---

## Code pillar

### Design system & design engine

The UI is built on a small in-house design system with two layers:

1. **Design tokens** — semantic CSS variables in `app/globals.css` (primary, secondary, danger, success, muted) mapped into Tailwind v4 via `@theme inline`.
2. **Components** — Base UI primitives wrapped in `src/components/ui/` (Button, Input, Dialog, Drawer, Toast, Table, etc.) with project-specific variants, spacing, and accessibility preserved from Base UI.

Typography uses a locally hosted **Inter** variable font (`next/font/local`). Higher-level patterns live in `src/components/major/` (e.g. `TableList`, form field wrappers, `PanelWrapper`) and feature modules under `src/components/auth` and `src/components/article`.

Agent skills in `.cursor/skills/` document conventions for creating new UI and form components consistently.

### Technologies

| Area | Stack |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, `clsx` |
| UI primitives | Base UI (`@base-ui/react`) |
| Data fetching | TanStack Query v5 |
| Tables / lists | TanStack Table, TanStack Virtual |
| Forms | React Hook Form, Yup, `@hookform/resolvers` |
| Routing UX | `@bprogress/next` (top progress bar) |
| Backend | DummyJSON via same-origin proxy + local BFF auth routes |
| Package manager | pnpm |

### Abstraction, modularity & reusability

The codebase separates concerns into predictable layers:

- **UI primitives** (`components/ui`) — stateless, reusable, typed wrappers around Base UI.
- **Compositions** (`components/major`) — cross-feature building blocks (tables, modals, form controls).
- **Feature sections** (`components/auth`, `components/article`) — page-level UI wired to hooks.
- **Action hooks** (`useAuthActions`, `useArticleActions`) — encapsulate mutations, toasts, cache invalidation, and navigation callbacks so forms stay thin.
- **Query hooks** (`useArticlesList`, `useArticleDetail`, …) — read-only data access on top of service layer.
- **Services** (`src/services/api/*`) — one module per domain; React Query keys and `enabled` flags live next to fetchers.
- **Configs** — validators, column definitions, and user-facing messages are centralized instead of duplicated in components.

Coupling is tracked with **`pnpm analyze-coupling`** (`ts-modularity`). An HTML report is committed under `dep-graph-out/` (94 modules, 111 dependency edges) for visual inspection of cluster boundaries and import direction.

### State management

| Concern | Solution |
| --- | --- |
| Server / API state | **TanStack Query** — cached queries, mutations, invalidation |
| Ephemeral UI (toasts) | Base UI toast manager + `useToaster` hook |
| Register → login handoff | **Zustand** (`permenant-store`) — prefills credentials after signup |
| Auth session identity | React Query `getUserData` + httpOnly cookies |
| Form state | React Hook Form (local, per form) |

Login warms the user cache immediately via `queryClient.setQueryData` so the panel renders without waiting for a second `/me` round-trip.

### API management

```
Browser  →  /api/* (same origin)
              ├─ BFF routes: auth/login, auth/refresh, auth/me, auth/logout
              └─ Rewrites: everything else → NEXT_PUBLIC_SERVER_URL (DummyJSON)
```

- **`http-client.ts`** — single fetch wrapper: JSON headers, `credentials: "include"`, throws typed `ApiError`.
- **401 handling** — automatic refresh via `/api/auth/refresh`; retries once; clears session and redirects to `/login?from=…` when refresh fails.
- **BFF auth routes** — set httpOnly cookies with controlled lifetimes (short access token, 30-day refresh token) instead of trusting upstream `Set-Cookie` headers that could overwrite session cookies.
- **Service modules** — `auth-services`, `article-services`, `user-services` expose `useQuery` / `useMutation` hooks with typed payloads from `src/types/data-contracts.ts`.
- **Query params** — `getParametrizedUrl` normalizes pagination (`page` → `skip`, `pageSize` → `limit`) and strips nullish values.

### Error handling

- **`ApiError`** — custom error with `status`, optional `code` and `data`; used across services and action hooks.
- **Action hooks** — catch failures, show danger toasts with API message, optional typed error callbacks.
- **Auth** — centralized `handleUnauthorizedSession` (clear cookies, drop user cache, safe redirect).
- **Missing articles** — `notFound()` from `useArticleDetail` on 404.
- **Global UI** — `app/error.tsx` boundary with retry; `app/not-found.tsx` for unknown routes.
- **Forms** — Yup schemas in `src/configs/validators.ts` with field-level messages before any network call.

### Bundle & coupling analysis

```bash
pnpm analyze-bundle    # Next.js experimental bundle analyzer
pnpm analyze-coupling  # ts-modularity → inspect dep-graph-out/index.html
```

Use the bundle analyzer to review client vs server chunks and spot heavy dependencies. Use the coupling graph to find over-connected modules and keep feature boundaries clean (e.g. UI should not import services directly; hooks sit in between).

---

## Performance pillar

### Security

- **httpOnly, Secure, SameSite=Lax** cookies for tokens — not accessible from JavaScript.
- **Middleware** guards `/articles/*`; unauthenticated users redirect to `/login?from=…` with an open-redirect-safe allowlist.
- **BFF auth layer** prevents upstream responses from clobbering local cookie policy.
- **Refresh-token rotation** — access token expires quickly; refresh cookie is the session anchor; silent refresh on 401.
- **Input validation** — Yup on login, register, and article forms (password length, email format, required fields).
- **Dependencies** — modern pinned majors (Next 16, React 19, TanStack Query 5); `prebuild` runs lint + unit tests before every production build.
- **Credentials** — all authenticated fetches use `credentials: "include"`; logout clears cookies via a dedicated route handler.

Set secrets and environment-specific URLs via `.env` (gitignored) or your host's env UI — never commit real values. `NEXT_PUBLIC_*` variables are embedded in the client bundle by design.

### Cache mechanism

| Layer | Behavior |
| --- | --- |
| React Query default | `staleTime: 60s` — avoids refetch storms on navigation |
| Login | `setQueryData(['getUserData'])` — instant user on first paint |
| Mutations | `invalidateQueries` on article create/update/delete |
| Refresh | Singleton in-flight refresh promise — concurrent 401s share one refresh call |
| Auth queries | No retry on 401; `refetchOnWindowFocus: false` on `/me` |

User-scoped queries use `enabled: !!userId` so they never fire before the session is ready.

### Bundle size & build output

Production builds use **`output: "standalone"`** in `next.config.ts`, producing a minimal self-contained Node server (`.next/standalone`) suitable for Docker or any container runtime without shipping the full `node_modules` tree.

Run `pnpm analyze-bundle` after `pnpm build` to inspect route-level and dependency-level weight. Prefer keeping heavy logic in Server Components / route handlers and lazy-loading client islands where possible.

### Build strategy

```
pnpm build  →  lint + unit tests (prebuild)  →  next build (standalone)
pnpm start  →  node .next/standalone/server.js  (or next start in dev-like setups)
```

Standalone output is ideal for:

- Container deployments (copy `standalone`, `.next/static`, and `public`)
- Platforms that run a single Node process (Railway, Fly.io, AWS, on-prem)

For Vercel, deploy the repo directly; set `NEXT_PUBLIC_SERVER_URL` in the project environment settings. Rewrites are baked in at build time.

---

## Automation pillar

### Testing

**Unit tests** (`tests/unit/`, Playwright as runner):

- Pure utility coverage — e.g. `getParametrizedUrl` pagination and query-string merging.
- Fast, no browser launch; run via `pnpm test:unit`.

**E2E tests** (`tests/e2e/`, Playwright):

- Runs against `pnpm dev` (auto-started unless a server is already running locally).
- **Chromium, Firefox, and WebKit** projects for cross-browser coverage.
- Example: login form validation errors on empty submit.
- CI retries (2×) and HTML report artifact upload.

```bash
pnpm test:unit   # unit
pnpm test:e2e    # e2e (all configured browsers)
```

`prebuild` enforces lint + unit tests before `next build`, catching regressions before release artifacts are produced.

A GitHub Actions workflow (`.github/workflows/playwright.yml`) runs Playwright on push/PR to `main`/`master`.

### Linting

ESLint 9 flat config (`eslint.config.mjs`) extends **`eslint-config-next`** (Core Web Vitals + TypeScript). Ignores build output (`.next`, `out`, `build`).

```bash
pnpm lint
```

Project-specific rule tweaks keep hooks and JSX pragmatism practical while preserving Next.js recommended defaults.

---

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SERVER_URL` | Yes | DummyJSON base URL (e.g. `https://dummyjson.com`). Used for API rewrites and BFF upstream calls. |

Copy `.env.sample` to `.env` for local development.

---

## Project routes

| Route | Description |
| --- | --- |
| `/` | Redirects to `/articles` |
| `/login`, `/register` | Auth flows |
| `/articles` | Paginated article list |
| `/articles/create` | New article form |
| `/articles/edit/[id]` | Edit article form |

---

## License

Private — interview / assessment project.
