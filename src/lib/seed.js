// Run: node src/lib/seed.js
// Creates default admin user

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("dcs_@safe123", 12);

  const admin = await prisma.admin.upsert({
    where: { username: "admin@myapp" },
    update: {},
    create: {
      username: "admin@myapp",
      password: hashedPassword,
    },
  });

  console.log("✅ Admin user created:", admin.username);
  console.log("   Username: admin@myapp");
  console.log("   Password: dcs_@safe123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
