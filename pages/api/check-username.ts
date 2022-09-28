// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  // Check if a username is available
  if (req.method === 'GET') {
    const username = req.query.username as string;

    // check that username contains only alphanunmeric characters or underscores
    if (username && !username.match(/^[a-zA-Z0-9_]+$/)) {
      res.status(400).json({ message: 'Username may only contain alphanumeric characters.' });
      return;
    }

    if (req.query.username!.length < 3 || req.query.username!.length > 20) {
      res.status(400).json({ message: 'Username must be between 3 and 20 characters' });
      return;
    }

    const user = await prisma.user
      .findUnique({
        where: {
          username: req.query.username as string,
        },
      })
      .then((user) => {
        if (user) {
          res.status(200).json({ available: false });
        } else {
          res.status(200).json({ available: true });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'User retrieval failed', error: err });
      });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
