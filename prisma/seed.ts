import "dotenv/config";
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function main() {
  const allowedEmails = [
    'hogr.fathalla@btvi.edu.iq',
    'danyar.salih@btvi.edu.iq',
    'karwan.abdalla@btvi.edu.iq',
    'jawhar.wsu@btvi.edu.iq',
    'mohammed.ahmed@btvi.edu.iq',
  ];

  for (const email of allowedEmails) {
    await prisma.user.upsert({
      where: { email },
      update: { isAllowed: true },
      create: {
        email,
        isAllowed: true,
        name: email.split('@')[0],
      },
    });
  }

  console.log('Allowed users created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });