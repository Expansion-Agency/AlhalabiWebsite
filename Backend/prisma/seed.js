// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// async function main() {
//   // Create sample categories
//   const categories = await prisma.category.createMany({
//     data: [
//       {
//         nameEn: 'Packaging',
//         nameAr: 'تغليف',
//         imagePath: '/images/electronics.jpg',
//       },
//       {
//         nameEn: 'Food Processing',
//         nameAr: 'معالجة الطعام',
//         imagePath: '/images/fashion.jpg',
//       },
//       {
//         nameEn: 'Labeling',
//         nameAr: 'المنزل والمطبخ',
//         imagePath: '/images/home_kitchen.jpg',
//       },
//       {
//         nameEn: 'Mixers',
//         nameAr: 'خلاطات',
//         imagePath: '/images/home_kitchen.jpg',
//       },
//       {
//         nameEn: 'Accessories',
//         nameAr: 'مُكَمِّلات',
//         imagePath: '/images/home_kitchen.jpg',
//       },
//     ],
//   });

//   console.log('Categories seeded:', categories);
// }

// main()
//   .catch(e => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  // Seed categories
  const categories = await Promise.all(
    ["Packaging", "Food Processing", "Labeling", "Mixers", "Accessories"].map(async (category) => {
      return await prisma.category.create({
        data: {
          nameEn: category,
          nameAr: category, // Assuming the same name in Arabic for simplicity
          imagePath: "", // Add appropriate image paths here if necessary
        },
      });
    })
  );

  // Seed products
  const allProducts = [
    {
      title: "Packaging Machine",
      category: "Packaging",
      image:
        "https://www.spackmachine.com/wp-content/uploads/2022/03/Pouch-packaging-machines-1.png",
      description: "High-speed packaging solution for various products.",
      priceEgp: 1000.00,
      priceUsd: 50.00,
      quantity: 10,
    },
    {
      title: "Food Processor",
      category: "Food Processing",
      image:
        "https://essemmindia.com/wp-content/uploads/2020/07/Overview-of-Food-Processing-Equipment-for-commercial-kitchens.jpeg",
      description: "Reliable machine for food cutting, mixing, and grinding.",
      priceEgp: 2000.00,
      priceUsd: 100.00,
      quantity: 5,
    },
    {
      title: "Labeling System",
      category: "Labeling",
      image:
        "https://www.herma.us/fileadmin/Etikettierer/Produkte/152C/Clean_Design1.jpg",
      description: "Efficient automatic labeling for all packaging types.",
      priceEgp: 500.00,
      priceUsd: 25.00,
      quantity: 8,
    },
    {
      title: "Industrial Mixer",
      category: "Mixers",
      image: "https://m.media-amazon.com/images/I/71j06FmmWxL.jpg",
      description: "Heavy-duty mixers for industrial applications.",
      priceEgp: 3000.00,
      priceUsd: 150.00,
      quantity: 4,
    },
    {
      title: "Spare Parts",
      category: "Accessories",
      image:
        "https://www.texasgulfsales.com/media/k2/items/cache/e31ace2a15a7c70645ad83df9ecd43b0_XL.jpg",
      description: "Genuine parts and accessories for all our machines.",
      priceEgp: 150.00,
      priceUsd: 7.50,
      quantity: 20,
    },
  ];

  // Map the products to the appropriate categories and insert them
  for (const product of allProducts) {
    const category = categories.find(c => c.nameEn === product.category);

    // Seed product and related images
    const createdProduct = await prisma.products.create({
      data: {
        nameEn: product.title,
        nameAr: product.title, // Assuming Arabic name is the same for now
        descriptionEn: product.description,
        descriptionAr: product.description, // Assuming Arabic description is the same for now
        priceEgp: product.priceEgp,
        priceUsd: product.priceUsd,
        quantity: product.quantity,
        categoryId: category.id,
      },
    });

    // Seed product image
    await prisma.productImages.create({
      data: {
        productId: createdProduct.id,
        imagePath: product.image,
        isDefault: true, // Assuming the first image is the default
      },
    });
  }

  console.log("Seeding completed!");
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
