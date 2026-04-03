// Seed script - run: node --experimental-modules prisma/seed.mjs
import { PrismaClient } from "../src/generated/prisma/client.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.admin.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
    },
  });

  console.log("✅ Admin user created:", admin.username);
  console.log("   Username: admin");
  console.log("   Password: admin123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
