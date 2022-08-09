import { Category, ItemTemplate, PrismaClient } from '@prisma/client';
import templateJson from './templates.json';

// This only ever runs once, so create a new client for each run
const prisma = new PrismaClient();

// Generate seed data based on the schema
async function main() {
  // Data for user seed
  const users = [
    {
      name: 'John Doe',
      email: 'test@example.com',
    },
    {
      name: 'Jane Doe',
      email: 'test1@example.com',
    },
  ];

  // Data for item seed
  const items = [
    {
      title: 'Item 1',
      serialNumber: '12345',
      price: 100.0,
      published: true,
      image: 'https://picsum.photos/200',
      authorId: 1,
      templateId: 1,
    },
    {
      title: 'Item 2',
      serialNumber: '23456',
      price: 57.5,
      published: false,
      image: 'https://picsum.photos/200',
      authorId: 2,
      templateId: 1,
    },
    {
      title: 'Item 3',
      serialNumber: '34567',
      price: 123.0,
      published: true,
      image: 'https://picsum.photos/200',
      authorId: 2,
      templateId: 1,
    },
    {
      title: 'Item 4',
      serialNumber: '56789',
      price: 1500.0,
      published: true,
      image: 'https://picsum.photos/200',
      authorId: 1,
      templateId: 2,
    },
  ];

  // Data for collection seed
  const collections = [
    {
      title: 'My awesome stuff',
      description: 'This is a list of my awesome stuff',
      authorId: 1,
    },
  ];

  // Create users
  console.log('Creating users...');
  await prisma.user.createMany({
    data: users,
  });

  console.log('Creating templates...');
  await prisma.itemTemplate.createMany({
    data: templateJson as ItemTemplate[],
  });

  // Create items
  console.log('Creating items...');
  await prisma.item.createMany({
    data: items,
  });

  // Create collections
  console.log('Creating collections...');
  await prisma.collection.createMany({
    data: collections,
  });

  console.log('Data seed finished.');
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
