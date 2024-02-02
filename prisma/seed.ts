import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      uuid: '18b1992a-2cc8-454b-94e3-e69f6610905c',
      name: 'John',
      lastName : 'Wick',
      email : 'John@continental.com',
      user : 'babayaga',
      password : 'ilovepuppies',
      active : true,
    },
  });

  console.log(`New user created: `, newUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});
