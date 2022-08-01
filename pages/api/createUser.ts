// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    // Create a user in the DB and return the user
    const { name, email } = req.body;
    await prisma.user
      .create({
        data: {
          name,
          email,
        },
      })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: 'User creation failed', error: err });
      });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
