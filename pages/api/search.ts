// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import checkSession from '../../lib/checkSession';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await checkSession(req, res);
  // There's probably a smarter way to do this but I can't come up with one right now.
  if (!session) {
    res.status(401).json({ message: 'Invalid session' });
    return;
  }

  // Get all items with the request body user id from the db
  if (req.method === 'POST') {
    const searchTerm = req.body.query;
    // Find item templates that match the search term
    await prisma.itemTemplate
      .findMany({
        where: {
          brand: {
            search: searchTerm as string,
          },
          OR: [
            {
              model: {
                search: searchTerm as string,
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
  }
}
