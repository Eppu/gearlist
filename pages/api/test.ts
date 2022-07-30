// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // Get all items with the request body user id from the db
  if (req.method === "GET") {
    const { id } = req.query;
    await prisma.item
      .findMany({
        where: {
          authorId: Number(id),
        },
      })
      .then((items) => {
        res.status(200).json(items);
      })
      .catch((err) => {
        res.status(500).json({ message: "Items retrieval failed", error: err });
      });
  }
}
