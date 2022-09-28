// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  // Get a user from the DB by username and return the user
  if (req.method === 'GET') {
    const user = await prisma.user
      .findUnique({
        where: {
          username: req.query.username as string,
        },
      })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: 'User retrieval failed', error: err });
      });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
