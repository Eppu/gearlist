// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import checkSession from '../../lib/checkSession';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const session = await checkSession(req, res);
  // There's probably a smarter way to do this but I can't come up with one right now.
  if (!session) {
    res.status(401).json({ message: 'Invalid session' });
    return;
  }

  if (req.method === 'POST') {
    const { query, limit } = req.body;
    // Find item templates that match the search term
    await prisma.itemTemplate
      .findMany({
        take: limit || 20,
        where: {
          brand: {
            search: query,
          },
          OR: [
            {
              model: {
                search: query as string,
              },
            },
          ],
        },
      })
      .then((items) => {
        res.status(200).json({ count: items.length, items });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Items retrieval failed', error: err });
      });
    // }
    // res.status(400).json({ message: 'No search term provided' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
