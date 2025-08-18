export type AgendaSlot = { time: string; title: string; detail?: string; outcomes?: string[] };

export const AGENDA = {
  name: "Dudester Summit — Pro Hackathon",
  theme: "Four to One: converge founder MVPs into a single, shippable product.",
  venue:
    "RTP studio space with breakout tables, whiteboards, fiber, and an indecently good espresso machine.",
  friday: <AgendaSlot[]>[
    {
      time: "12:30–1:00",
      title: "Arrival & Setup",
      detail:
        "Wi-Fi, repo access, branch naming, tooling sanity checks. Name badges, hex stickers, vibes."
    },
    {
      time: "1:00–1:30",
      title: "Bourbon Welcome + Context",
      detail:
        "Tasting flight (Kentucky, small-batch). Each founder states intent in one line.",
      outcomes: ["Shared context", "Energy set", "Ground rules agreed"]
    },
    {
      time: "1:30–3:00",
      title: "Founder MVP Lightning Demos",
      detail:
        "10 minutes per MVP (live demo > slides), 10 minutes of targeted Q&A.",
      outcomes: ["Catalog of parts", "Initial sparks and integration ideas"]
    },
    {
      time: "3:00–3:30",
      title: "Break & Pairing",
      detail:
        "Match strengths to gaps. Identify 2–3 fusion directions worth pursuing."
    },
    {
      time: "3:30–4:30",
      title: "Convergence Workshop I",
      detail:
        "Hexagon model canvas: Vision • Users • Jobs • Moats • Riskiest Assumption • 2-week Win.",
      outcomes: ["Shortlist of fusion concepts"]
    },
    {
      time: "4:30–5:30",
      title: "Technical Spike",
      detail:
        "Quick-and-dirty probes: API feasibility, data model sketch, UX wireframe, agent loop sanity.",
      outcomes: ["Evidence on what will work this weekend"]
    },
    {
      time: "5:30–6:30",
      title: "Bourbon + Five-Star Bites",
      detail: "Palate reset. Lighter conversation. No decisions—just sensing."
    },
    {
      time: "6:30–7:00",
      title: "Convergence Workshop II — Decide",
      detail:
        "Select one unified product. Name a DRI. Define success by Saturday noon.",
      outcomes: ["One product", "Owner named", "Saturday Definition of Done"]
    },
    {
      time: "7:00–8:30",
      title: "Sprint #1 — Fusion Build",
      detail:
        "Form squads: Architect, Builder, Curator, Integrator. Build vertical slice: auth → one magical moment → share link."
    },
    {
      time: "8:30–9:00",
      title: "Fireside Reflections",
      detail:
        "What surprised us? What to cut ruthlessly tomorrow? Nightly log written in repo."
    }
  ],
  saturday: <AgendaSlot[]>[
    { time: "8:30–9:00", title: "Coffee & Reset", detail: "System checks, plan review." },
    {
      time: "9:00–9:50",
      title: "Sprint #2",
      detail: "Integrate agents, polish onboarding, tighten copy.",
      outcomes: ["Faster TTFH", "Fewer clicks"]
    },
    {
      time: "10:00–10:50",
      title: "Sprint #3",
      detail: "Instrumentation, empty states, error UX, seed data.",
      outcomes: ["Usable in the wild", "Metrics land"]
    },
    {
      time: "11:00–11:30",
      title: "Launch Prep",
      detail:
        "Domain, metadata, OG image, performance pass, privacy notes, pricing placeholder.",
      outcomes: ["Public link ready"]
    },
    {
      time: "11:30–12:00",
      title: "Soft Launch",
      detail: "Deploy to Vercel/TestFlight. Share with 5 trusted testers.",
      outcomes: ["Live URL", "Initial feedback collected"]
    },
    {
      time: "12:00–12:30",
      title: "Champagne Close",
      detail: "Retro: keep/change/try. Assign the 2-week follow-through."
    }
  ],
  roles: [
    { name: "Architect",  focus: "System clarity, data model, security posture, scalability path." },
    { name: "Builder",    focus: "Shipping code: components, endpoints, agent loops, tests." },
    { name: "Curator",    focus: "Brand, UX micro-moments, copywriting, taste. Protects simplicity." },
    { name: "Integrator", focus: "Glue: CI/CD, auth, email, billing toggles, analytics." }
  ],
  rituals: [
    "90-minute loops; demo or it didn't happen.",
    "No laptops in decision circles.",
    "Every big call has a DRI and an Issue link.",
    "Celebrate small wins—bourbon & banter optional."
  ],
  stackHints: [
    "Next.js + Vercel + Postgres",
    "Auth: email/password (Lucia); later SSO",
    "Email: MailerLite",
    "AI: provider-agnostic via adapters; cache for cost control",
    "Blockchain: minimal; use when trust or portability matter"
  ]
};
