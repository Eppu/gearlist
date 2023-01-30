// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import checkSession from '../../../lib/checkSession';
import { prisma } from '../../../lib/prisma';

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
  // POST /api/items/search
  if (req.method === 'POST') {
    const { query, limit } = req.body;
    // TODO: remove starting and trailing whitespace from query
    const sanitizedQuery = query.trim();

    // Find item templates that match the search term
    const result = await prisma.itemTemplate.findMany({
      take: limit || 10,
      where: {
        brand: {
          search: sanitizedQuery.split(' ').join(' & '), // manual sanitization since Prisma doesn't support multiple string search terms
        },
        OR: [
          {
            model: {
              search: sanitizedQuery.split(' ').join(' & ') as string, // manual sanitization
            },
          },
        ],
      },
    });

    if (!result) {
      res.status(500).json({ message: 'Items retrieval failed' });
      return;
    }

    res.status(200).json({ count: result.length, items: result });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
