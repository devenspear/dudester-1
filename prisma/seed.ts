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

  for (const f of founders) {
    await prisma.user.upsert({
      where: { email: f.email.toLowerCase() },
      create: {
        email: f.email.toLowerCase(),
        name: f.name,
        role: "founder",
        password: passwordHash,
      },
      update: { name: f.name },
    })
  }
  // eslint-disable-next-line no-console
  console.log("Seed complete: founders upserted")
}

main().finally(async () => {
  await prisma.$disconnect()
})


