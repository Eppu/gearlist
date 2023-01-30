// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import checkSession from '../../../lib/checkSession';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const session = await checkSession(req, res);
  // There's probably a smarter way to do this but I can't come up with one right now.
  if (!session) {
    res.status(401).json({ message: 'Invalid session' });
    return;
  }

  // POST /api/items/
  if (req.method === 'POST') {
    console.log(`Creating item for user ${session.user.id} using payload ${JSON.stringify(req.body)}`);
    const templateId = req.body.id;
    const authorId = session.user.id;

    // Create a new item record with the given templateId for the user
    await prisma.item
      .create({
        data: {
          templateId,
          authorId,
          image: req.body.image || '/images/placeholder.jpg',
        },
      })
      .then((item) => {
        res.status(200).json({ item });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Item creation failed', error: err });
      });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
