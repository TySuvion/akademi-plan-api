import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // create two dummy users
  const user1 = await prisma.user.upsert({
    where: {
      username: 'TestUser1',
    },
    update: {
      password: 'TestPassword1',
    },
    create: {
      username: 'TestUser1',
      password: 'TestPassword1',
    },
  });

  const user2 = await prisma.user.upsert({
    where: {
      username: 'TestUser2',
    },
    update: {
      password: 'TestPassword2',
    },
    create: {
      username: 'TestUser2',
      password: 'TestPassword2',
    },
  });

  const user3 = await prisma.user.upsert({
    where: {
      username: 'TylerRose',
    },
    update: {
      password: 'Test3358',
    },
    create: {
      username: 'TylerRose',
      password: 'Test3358',
    },
  });
}

//execute main
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close prisma client at the end
    await prisma.$disconnect();
  });
