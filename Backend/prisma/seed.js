// // seed.js
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// async function main() {
//   // Add review data
//   const review = await prisma.reviews.create({
//     data: {
//       rating: 5, // Example rating, you can choose any number between 1-5
//       comment: "This is an excellent product!", // Example comment
//       productId: 36, // Example productId, you should ensure that this ID exists in the Products table
//        // Example userId, you should ensure this ID exists in the Users table
//     },
//   });

//   console.log('Review added:', review);
// }

// main()
//   .catch(e => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('yourPassword123', 10);

  const user = await prisma.users.create({
    data: {
      username: 'testuser',
      email: 'test@example.com',
      password: hashedPassword,
      phone: '0123456789',
      isVerified: true,
    },
  });

  console.log('User created:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  