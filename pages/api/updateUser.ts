import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../../lib/prisma';

export interface UpdateUserPayload {
  username?: string;
  name?: string;
  image?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  // update user based on information in the payload. only the user with the same id as the payload can update their own information
  if (req.method === 'PUT') {
    const id = req.body.id;
    const updatePayload: UpdateUserPayload = req.body;
    const user = await prisma.user
      .update({
        where: {
          id: id,
        },
        data: {
          username: updatePayload?.username,
          name: updatePayload?.name,
          image: updatePayload?.image,
        },
      })
      .then((user) => {
        res.status(200).json({ user: user });
      })
      .catch((err) => {
        res.status(500).json({ message: 'User update failed', error: err });
      });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
