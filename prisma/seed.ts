import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // create two dummy users
  const user1 = await prisma.user.create({
    data: {
      username: 'TestUser1',
      password: 'TestPassword1',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'TestUser2',
      password: 'TestPassword2',
    },
  });

  // create two dummy courses
  const course1 = await prisma.course.update({
    where: {
      id: 1,
    },
    data: {
      userID: user1.id,
    },
  });

  const course2 = await prisma.course.update({
    where: {
      id: 2,
    },
    data: {
      userID: user2.id,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      name: 'Grundlagen der Informatik',
      userID: user1.id,
    },
  });

  console.log(`Created courses: ${course1.name}, ${course2.name}`);
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
