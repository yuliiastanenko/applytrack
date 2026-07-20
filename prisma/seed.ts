import { config } from "dotenv"
config()

import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { neonConfig } from "@neondatabase/serverless"
import ws from "ws"
import bcrypt from "bcryptjs"

neonConfig.webSocketConstructor = ws

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
const db = new PrismaClient({ adapter })

async function main() {
  const password = await bcrypt.hash("demo1234", 10)

  const user = await db.user.upsert({
    where: { email: "demo@applytrack.dev" },
    update: {},
    create: {
      email: "demo@applytrack.dev",
      name: "Demo User",
      password,
    },
  })

  await db.application.createMany({
    data: [
      {
        company: "Spotify",
        position: "Frontend Developer",
        status: "APPLIED",
        userId: user.id,
      },
      {
        company: "Google",
        position: "Backend Developer",
        status: "SCREENING",
        userId: user.id,
      },
      {
        company: "Klarna",
        position: "Fullstack Engineer",
        status: "INTERVIEW",
        userId: user.id,
      },
      {
        company: "Hotmat.se",
        position: "React Developer",
        status: "OFFER",
        userId: user.id,
      },
      {
        company: "Voi",
        position: "Frontend Developer",
        status: "REJECTED",
        userId: user.id,
      },
      {
        company: "Notion",
        position: "Product Engineer",
        status: "WISHLIST",
        userId: user.id,
      },
    ],
  })

  console.log("Seed complete. Demo login: demo@applytrack.dev / demo1234")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
