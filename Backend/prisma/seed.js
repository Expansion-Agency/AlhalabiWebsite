const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create sample categories
  const categories = await prisma.category.createMany({
    data: [
      {
        nameEn: 'Packaging',
        nameAr: 'تغليف',
        imagePath: '/images/electronics.jpg',
      },
      {
        nameEn: 'Food Processing',
        nameAr: 'معالجة الطعام',
        imagePath: '/images/fashion.jpg',
      },
      {
        nameEn: 'Labeling',
        nameAr: 'المنزل والمطبخ',
        imagePath: '/images/home_kitchen.jpg',
      },
      {
        nameEn: 'Mixers',
        nameAr: 'خلاطات',
        imagePath: '/images/home_kitchen.jpg',
      },
      {
        nameEn: 'Accessories',
        nameAr: 'مُكَمِّلات',
        imagePath: '/images/home_kitchen.jpg',
      },
    ],
  });

  console.log('Categories seeded:', categories);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

