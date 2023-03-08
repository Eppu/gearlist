import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export interface UpdateUserPayload {
  username?: string;
  name?: string;
  image?: string;
  bio?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  // update user based on information in the payload. only the user with the same id as the payload can update their own information
  if (req.method === 'PUT') {
    const id = req.body.id;
    const updatePayload: UpdateUserPayload = req.body;

    // If no ID is provided, return an error
    if (!id) {
      res.status(400).json({ error: 'No ID provided' });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        profile: true,
      },
    });

    // if the user has no profile created, create a profile for them
    if (existingUser?.profile === null) {
      console.log(`Creating user profile for user ${id}`);
      await prisma.profile.create({
        data: {
          user: {
            connect: {
              id: id,
            },
          },
        },
      });
    }

    const user = await prisma.user
      .update({
        where: {
          id: id,
        },
        data: {
          username: updatePayload?.username,
          name: updatePayload?.name,
          image: updatePayload?.image,
          // also update profile bio if it exists
          profile: {
            update: {
              bio: updatePayload?.bio,
            },
          },
        },
        include: {
          profile: true,
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
