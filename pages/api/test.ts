// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // Get the session from the Next.js API
  const session = await unstable_getServerSession(req, res, authOptions);
  // Make sure the session is valid
  if (!session) {
    res.status(401).json({ message: 'Invalid session' });
    return;
  }
  // Get the user from the session
  const user = session.user;
  // Make sure the user is valid
  if (!user) {
    res.status(401).json({ message: 'Invalid user' });
    return;
  }
  console.log(user);
  // Get the user's ID from the session
  const userId = user.id;
  // Make sure the user's ID is valid
  if (!userId) {
    res.status(401).json({ message: 'Invalid user ID' });
    return;
  }

  // Make sure the user ID matches the incoming request
  if (userId !== req.query.userId) {
    res.status(401).json({ message: 'This user does not have access.' });
    return;
  }

  // Get all items with the request body user id from the db
  if (req.method === 'GET') {
    const { id } = req.query;
    await prisma.item
      .findMany({
        where: {
          authorId: Number(id),
        },
        include: {
          template: true,
        },
      })
      .then((items) => {
        res.status(200).json(items);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Items retrieval failed', error: err });
      });
  }
}
