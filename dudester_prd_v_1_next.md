# Dudester — Product Requirements Document (PRD)

*Last updated: 2025-08-17 (v1.2 mobile-first, built-in auth, Vercel Postgres playbook)*

## **1) Overview**

- **Project**: Dudester — founder-led AI product studio site
- **Goal**: Launch a professional, *mobile-first, iOS‑like PWA* on Vercel with built‑in email/password auth, an embedded private discussion thread for 4 founders (with email notifications), and pages for brand positioning, agenda, bios, and organization.
- **Audience**: The four founders (primary), close collaborators, future partners, and early audience.
- **Tone**: Playful/sassy × insightful/intelligent. Professional corporate polish.

## **2) Objectives & Success Metrics**

- **Objectives**
  - Ship v1 publicly as an installable PWA that feels like an iOS app (fullscreen, safe‑area aware).
  - Provide *built‑in* email+password auth (no third‑party IdP in v1) using open‑source, secure standards.
  - Embed a *single private discussion thread* with post/reply, stored in our DB, and send email notifications to all four founders on new posts.
  - Present clear brand positioning, bios, corporate‑style Hackathon Agenda, and Organization page.
- **KPIs**
  - Deployed on Vercel with HTTPS + manifest + service worker; install banner visible on iOS/Android.
  - 4/4 founders can sign in, post, and receive email notifications.
  - Time‑to‑interactive < 2.0s on mid‑range mobile; Lighthouse ≥ 90 (Perf/SEO/A11y/Best Practices).
  - Dark mode fully themed, toggle persists across sessions.

## **3) Scope**

- **In**: Landing, Auth, Home, Agenda, About, Organization, Private Discussion (single thread), PWA (manifest + SW), dark mode, analytics, SEO, accessibility.
- **Out (v1)**: CMS/MDX, SSO (Clerk), multi‑tenant forums, public blog, payments, admin console beyond basic role checks.
- **Assumptions**: Use open‑source libraries; minimal custom code where necessary (auth, discussion) following audited patterns.

## **4) Tech Stack**

- **Framework**: Next.js (App Router, TypeScript, React Server Components).
- **Hosting**: Vercel (Prod + Preview).
- **Styling/UI**: Tailwind CSS + shadcn/ui; Framer Motion micro‑interactions; `next-themes` for dark mode.
- **Auth (built‑in)**: **Lucia** (open‑source) for sessions + **argon2id** password hashing; HttpOnly cookies; CSRF protection.
- **DB/ORM**: **Prisma** with **Vercel Postgres** (pooled Prisma URL). SQLite acceptable for local dev.
- **Validation**: Zod.
- **Rate limiting**: Lightweight middleware (e.g., Upstash Ratelimit) on auth + post routes.
- **Email**: MailerLite (or MailerSend transactional) via REST; fallback: Resend/Nodemailer SMTP.
- **PWA**: Web app manifest, service worker (workbox or `next-pwa`), iOS meta tags (`apple-mobile-web-app-capable=yes`, `viewport-fit=cover`).
- **Images**: `next/image` with alt text and aspect‑ratio utilities.

## **5) Information Architecture (Routes)**

- `/` — **Landing** (hero + CTA to Login)
- `/login` — **Auth** (email+password; link to reset password)
- `/home` — **Homepage** (brand positioning, imagery, CTAs)
- `/agenda` — **Hackathon Agenda** (corporate schedule; hexagon motif)
- `/about` — **About Us** (founder bios + photos)
- `/organization` — **Organization** (legal/operating framework)
- `/discuss` — **Private Discussion** (single‑thread; embedded UI; auth required)
- `/api/auth/*` — signup, login, logout, reset, change password
- `/api/discuss/*` — CRUD for posts/replies; webhook outbox for email notifications
- `/api/notify` — server action to send MailerLite/MailerSend emails on new content

## **6) User Flows**

### **6.1 Sign Up / Login (founders only)**

1. Visit `/login`; enter email + password.
2. On first run, seed four founder accounts via script or secure invite link.
3. On success, redirect to `/home`; auth state shows avatar + access to `/discuss`.

### **6.2 Post in Discussion**

1. Open `/discuss` (auth required).
2. Compose post (title+body) or reply; submit.
3. Server stores to DB, emits notification job → `/api/notify` sends email to the four founders.
4. Page updates in real time via optimistic UI (no hard realtime needed in v1).

### **6.3 Install as PWA**

1. On mobile Safari/Chrome, prompt ‘Add to Home Screen’ with guidance.
2. App opens fullscreen with safe‑area insets and bottom nav.

### **6.4 Dark Mode**

1. Toggle in header switches theme; preference persists to localStorage and cookie for SSR.

## **7) Page‑by‑Page Content (Draft Copy)**

> Replace with final copy as needed. All content stored in TS constants, not CMS/MDX.

### **7.1 Landing (**``**)**

- **H1**: **Wisdom‑coded. AI‑fueled.**
- **Subhead**: Four RTP founders vibecoding useful software—and shipping it fast.
- **Primary CTA**: Login → `/login`
- **Visual**: Subtle animated gradient; bourbon‑copper accent; iOS‑style large title.

### **7.2 Home (**``**)**

- **Brand Essence**: *A founder guild of four 60‑year‑olds vibecoding the future—playful, insightful, relentlessly shipping.*
- **Pillars** (cards): Ageless Innovation • Vibecoding Method • Launch Bias
- **CTAs**: View Agenda • Meet the Founders • Open Discussion

### **7.3 Agenda (**``**)**

- Friday & Saturday schedule as previously defined (bourbon reception, sprints, launch, rituals).
- **Hexagon motif**: Vision • Roles • Stack • Sprints • Launch • Rituals.

### **7.4 About (**``**)**

- Four concise bios (100–140 words), consistent B/W portraits.

### **7.5 Organization (**``**)**

- LLC proposal, IP assignment, governance, cadence, privacy practices.

### **7.6 Discussion (**``**)**

- Single thread list with composer at top, replies nested one level, edit/delete by author, timestamp, author label.
- Email notification toggle per user (default ON for all four).

## **8) Mobile‑First iOS Experience**

- **Layout**: Safe‑area aware (`env(safe-area-inset-*)`), 44–48px tap targets, bottom nav for primary routes.
- **PWA**: Manifest (name, icons incl. Apple touch icons), SW caching for shell + static assets.
- **Meta**: `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style=black-translucent`, `theme-color` per theme.
- **Motion**: Gentle transitions (Framer Motion), reduced‑motion respect via media query.

## **9) Visual Design**

- **Colors**: Carbon Black (#0B0B0C), Bourbon Copper (#C9712C), Electric Mint (#36E2A0), Off‑White (#F6F6F4).
- **Type**: Space Grotesk (H1/H2), Inter (body).
- **Dark Mode**: Full theme tokens for bg, text, borders, cards; toggle in header.

## **10) Navigation & Layout**

- **Header**: Wordmark, Theme Toggle, Profile/Logout.
- **Bottom Nav (mobile)**: Home • Agenda • About • Discuss.
- **Footer**: © Dudester LLC • RTP, NC • Ship > Shout • Privacy • Terms • Contact.

## **11) Authentication & Security (v1)**

- **Library**: Lucia; session via HttpOnly secure cookies; rotating session IDs.
- **Passwords**: argon2id hashing; strength rules; login throttling; lockout after N failures.
- **CSRF/XSS**: CSRF tokens on mutations; output escaping; helmet‑like headers via Next.
- **Accounts**: Pre‑seed four founders; allowlist via env `ALLOWED_EMAILS` (comma‑sep). No public signup.
- **Password reset**: Signed time‑boxed link emailed via MailerLite/MailerSend.

## **12) Discussion System (embedded, in‑app)**

- **Models**
  - `User { id, email, name, role }`
  - `Post { id, authorId, title, body, createdAt, updatedAt }`
  - `Reply { id, postId, authorId, body, createdAt, updatedAt }`
  - `Notification { id, postId, type, sentAt }` (log)
- **Features**: create/edit/delete own content; soft‑delete; simple Markdown (bold/italic, links); server validation with Zod.
- **Spam/Abuse**: Not needed (closed group), but keep size limits.
- **Email Notifications**
  - Trigger on new **Post** (and optionally on first reply): server action calls `/api/notify`.
  - Provider: MailerLite (or MailerSend transactional). Store API key in env. Subject: "[Dudester] New post: " with deep link to `/discuss`.
  - Respect per‑user notification toggle; basic retry + logging.

## **13) Content Management**

- **No CMS** in v1. Copy lives in `content/` as TS modules (e.g., `content/home.ts`, `content/agenda.ts`).
- Site settings in `config/site.ts` (brand, links, meta, colors).

## **14) Analytics, SEO, A11y**

- **Analytics**: Vercel Analytics or Plausible.
- **SEO**: Title/description per route; OG image; sitemap/robots via `next-sitemap`.
- **A11y**: Semantic headings, focus states, color contrast, keyboard nav; prefers‑color‑scheme respected.

## **15) Components (Initial)**

- `Header`, `BottomNav`, `ThemeToggle`, `Container`, `Button`, `Card`, `Section`, `HexGrid`, `AuthForm`, `PostComposer`, `PostItem`, `ReplyItem`, `EmptyState`.

## **16) Acceptance Criteria (v1)**

- Mobile PWA installable; opens fullscreen on iOS; safe‑area respected.
- Dark mode toggle works and persists.
- All public pages render; copy from TS modules (no CMS/MDX).
- Founders can log in with email/password and see `/discuss`.
- Creating a new post sends an email notification to all four founders.
- Lighthouse scores ≥ 90 across categories on mobile.

## **17) Implementation Notes (Cursor/Next.js)**

- **Auth**: Lucia setup in `lib/auth`; Prisma models for `User` & sessions; argon2id via `@node-rs/argon2` or `argon2`.
- **DB**: Prisma schema; run migrations to **Vercel Postgres**. Seed script creates four founders.
- **Discussion**: RSC for list; server actions/API routes for create/edit/delete; optimistic updates.
- **Email**: `lib/email.ts` with provider adapter (MailerLite/MailerSend/Resend). ENV‑driven `EMAIL_PROVIDER` switch.
- **PWA**: `manifest.webmanifest`, icons, SW with basic caching; iOS meta; `viewport-fit=cover`.
- **Theming**: `next-themes` provider; CSS variables for light/dark tokens.
- **Rate limit**: Apply to `/api/auth/login` and `/api/discuss/create`.

## **18) Project Timeline**

- **Day 1**: Repo bootstrap; Tailwind/shadcn; theming; layout + bottom nav.
- **Day 2**: Lucia auth + Prisma + seed; login/logout; guards.
- **Day 3**: Discussion UI + CRUD; optimistic updates.
- **Day 4**: Email notifications integration; env + test; logging.
- **Day 5**: PWA (manifest/SW), iOS meta, safe‑area polish; Agenda/About/Org content.
- **Day 6**: QA, a11y, SEO, Lighthouse; deploy Production.

## **19) Risks & Mitigations**

- **Auth security**: Use vetted libs; argon2id; rate limits; no public signup.
- **Email deliverability**: Prefer transactional provider (MailerSend/Resend); set SPF/DKIM.
- **PWA on iOS**: Install prompts are manual; include clear instructions.
- **Data**: Periodic backup/export (Vercel Postgres); soft‑delete to prevent loss.

## **20) Future Roadmap**

- 2FA (TOTP), session device management.
- Realtime presence for discussion; attachments.
- Public landing variations and Dudester Drops blog.
- Optional SSO (Clerk) & external community integration.

---

## **Appendix A — Environment Variables (.env.local)**

```
DATABASE_URL=
AUTH_SECRET=
ALLOWED_EMAILS=deven@example.com,michael@example.com,sean@example.com,david@example.com
EMAIL_PROVIDER=mailerlite   # or mailersend or resend
MAILERLITE_API_KEY=
MAILERSEND_API_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=https://dudester.xyz
PLAUSIBLE_DOMAIN=dudester.xyz
```

## **Appendix B — Prisma Schema (excerpt)**

```prisma
model User {
  id        String  @id @default(cuid())
  email     String  @unique
  name      String?
  role      String  @default("founder")
  password  String  // argon2id hash
  createdAt DateTime @default(now())
  posts     Post[]
  replies   Reply[]
}

model Post {
  id        String   @id @default(cuid())
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  title     String
  body      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  replies   Reply[]
}

model Reply {
  id        String   @id @default(cuid())
  post      Post     @relation(fields: [postId], references: [id])
  postId    String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  body      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## **Appendix C — API Contracts (examples)**

```
POST /api/auth/login { email, password } -> 200 { user } | 401
POST /api/discuss/post { title, body } -> 200 { id }
POST /api/discuss/reply { postId, body } -> 200 { id }
POST /api/notify { type: "post", id } -> 202
```

## **Appendix D — iOS Meta & Manifest Notes**

- `apple-mobile-web-app-capable=yes`
- `apple-mobile-web-app-status-bar-style=black-translucent`
- `<meta name="theme-color" media="(prefers-color-scheme: light)" content="#0B0B0C">`
- `<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0B0B0C">`
- `viewport-fit=cover` to use safe areas; pad UI with `env(safe-area-inset-*)`.

---

## **Appendix E — Vercel Postgres Activation Playbook (Option A)**

### **0) Decide once**

Use **Vercel Postgres** (managed, pooled). Prisma must point to the **pooled Prisma URL**.

### **1) Add the Prisma + Vercel Postgres integration**

- In Vercel → your project → **Integrations → Prisma** → **Add**.
- Create a new **Postgres** database for this project.
- This injects env vars such as `POSTGRES_PRISMA_URL`, `POSTGRES_URL`, `POSTGRES_URL_NON_POOLING`.

### **2) Pull env vars locally**

```bash
vercel link
vercel env pull .env
```

If `DATABASE_URL` isn’t set, map it:

```env
DATABASE_URL=${POSTGRES_PRISMA_URL}
```

### **3) Install deps**

```bash
pnpm add prisma @prisma/client
pnpm add lucia zod @node-rs/argon2
```

(Optional) `pnpm add @vercel/postgres` for raw SQL checks.

### **4) Prisma schema**

Define models for `User`, `Post`, `Reply` (see Appendix B). Then:

```bash
pnpm prisma generate
```

### **5) Migrations + seed**

```bash
pnpm prisma migrate dev --name init
```

Create `prisma/seed.ts` to upsert the four founders with a strong temp password, then:

```bash
SEED_FOUNDER_PASSWORD="changeMeNOW!" pnpm prisma:seed
```

### **6) Prisma singleton**

Use a single Prisma client (`lib/prisma.ts`) to avoid dev hot‑reload leaks.

### **7) Health check route**

`/app/api/db/route.ts` runs a simple `SELECT 1` and returns `{ ok: true }`.

### **8) Deploy with migrations**

Run migrations during build:

```json
// package.json
{
  "scripts": { "build": "pnpm prisma:deploy && next build" }
}
```

Or create a guarded `/api/migrate` you call once post‑deploy.

### **9) Common pitfalls**

- Prisma can’t see envs → keep a `.env` (not only `.env.local`) and run `vercel env pull .env`.
- Edge runtime errors → add `export const runtime = "nodejs";` to routes using Prisma.
- Connection limits → ensure `DATABASE_URL` uses `POSTGRES_PRISMA_URL` (pooled).

### **10) End‑to‑end checklist**

-

