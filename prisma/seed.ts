import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // create two dummy courses
  const course1 = await prisma.course.create({
    data: {
      name: 'Mathe 1',
    },
  });

  const course2 = await prisma.course.create({
    data: {
      name: 'Statistik',
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
