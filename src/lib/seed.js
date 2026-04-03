// Run: node src/lib/seed.js
// Creates default admin user

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

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
