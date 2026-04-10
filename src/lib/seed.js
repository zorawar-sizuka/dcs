// Run: node src/lib/seed.js
// Creates default admin user using environment variables
// Set INITIAL_ADMIN_USER and INITIAL_ADMIN_PASS in .env before running

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const username = process.env.INITIAL_ADMIN_USER;
  const password = process.env.INITIAL_ADMIN_PASS;

  if (!username || !password) {
    console.error("❌ Set INITIAL_ADMIN_USER and INITIAL_ADMIN_PASS in .env first");
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.upsert({
    where: { username },
    update: {},
    create: {
      username,
      password: hashedPassword,
    },
  });

  console.log("✅ Admin user created:", admin.username);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
