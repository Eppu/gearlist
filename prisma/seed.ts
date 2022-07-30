import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Generate seed data based on the schema
async function main() {
  // Data for user seed
  const users = [
    {
      name: "John Doe",
      email: "test@example.com",
    },
    {
      name: "Jane Doe",
      email: "test1@example.com",
    },
  ];

  // Data for template seed
  const templates = [
    {
      brand: "Leica",
      model: "M-P-100",
      category: Category.CAMERA,
    },
  ];

  // Data for item seed
  const items = [
    {
      title: "Item 1",
      serialNumber: "12345",
      price: 100.0,
      published: true,
      image: "https://picsum.photos/200",
      authorId: 1,
      templateId: 1,
    },
    {
      title: "Item 2",
      serialNumber: "23456",
      price: 57.5,
      published: false,
      image: "https://picsum.photos/200",
      authorId: 2,
      templateId: 1,
    },
    {
      title: "Item 3",
      serialNumber: "34567",
      price: 123.0,
      published: true,
      image: "https://picsum.photos/200",
      authorId: 2,
      templateId: 1,
    },
  ];

  // Create users
  console.log("Creating users...");
  await prisma.user.createMany({
    data: users,
  });

  // Create templates
  console.log("Creating templates...");
  await prisma.itemTemplate.createMany({
    data: templates,
  });

  // Create items
  console.log("Creating items...");
  await prisma.item.createMany({
    data: items,
  });

  console.log("Data seed finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
