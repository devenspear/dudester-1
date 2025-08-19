import { PrismaClient } from "@prisma/client"
import { hash } from "@node-rs/argon2"

const prisma = new PrismaClient()

const founders = [
  { email: "Davidwwilson@gmail.com", name: "David Wilson" },
  { email: "s.robert.harrison@gmail.com", name: "Robert Harrison" },
  { email: "mcworthington@me.com", name: "Michael Worthington" },
  { email: "deven@deven.guru", name: "Deven Spear" },
]

async function main() {
  const passwordPlain = process.env.SEED_FOUNDER_PASSWORD || "ChangeMeNOW!2025"
  const passwordHash = await hash(passwordPlain, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
    salt: Buffer.from("dudester-seed-salt"),
  })

  const users = []
  for (const f of founders) {
    const user = await prisma.user.upsert({
      where: { email: f.email.toLowerCase() },
      create: {
        email: f.email.toLowerCase(),
        name: f.name,
        role: "founder",
        password: passwordHash,
      },
      update: { name: f.name },
    })
    users.push(user)
  }

  // Create example idea from spec
  const seanUser = users.find(u => u.email === "s.robert.harrison@gmail.com")
  if (seanUser) {
    await prisma.idea.upsert({
      where: { id: "example-agent-crm" },
      create: {
        id: "example-agent-crm",
        title: "Agent-First CRM for 1-Person Businesses",
        oneLiner: "For solo operators who hate CRMs, DudeCRM automates follow-ups and summarises conversations via an email-native agent.",
        category: "Agent",
        status: "Backlog",
        driId: seanUser.id,
        tags: "agent,email,solo,sales",
        targetAudience: "1-3 person services businesses; ~20M globally; heavy email reliance.",
        fundamentalNeeds: "remember to follow up; keep light pipeline; capture notes automatically",
        tamSamSom: "$15B / $3B / $150M (source: SMB CRM + solo pros estimates)",
        competitiveSet: "Pipedrive (too heavy), Superhuman (not CRM), Streak (manual). Wedge: agent does 80% of admin.",
        coreJourney: "connect inbox → auto-extract contacts → agent drafts follow-ups → 1-click send → pipeline view updates",
        mustHaveMoment: "uncannily good drafts in your voice + zero manual pipeline entry",
        dataAiAdvantage: "personalized fine-tuning on your sent mail; private vector store per user",
        trustRails: "local encryption of embeddings; user-owned export",
        effortSize: "M",
        dependencies: "Gmail/Outlook APIs; vector DB; email sending",
        risks: "deliverability; draft accuracy; privacy expectations",
        twoWeekWin: "working inbox connect + follow-up draft loop for 5 testers",
        founderRelevance: 4,
      },
      update: {},
    })
  }

  // eslint-disable-next-line no-console
  console.log("Seed complete: founders and example idea created")
}

main().finally(async () => {
  await prisma.$disconnect()
})


