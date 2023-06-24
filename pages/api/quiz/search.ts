import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* Get all public quizzes */
  if (req.method === "GET") {
    try {
      const client = await connectToDatabase();
      const db = client.db("nextjs-quiz-db");
      const collection = db.collection("quizzes");

      const projection = {
        owner: 1,
        genre: 1,
        difficulty: 1,
        createdAt: 1,
        participants: 1,
      };

      const filter = {
        isPublic: true,
        ...req.query,
      };

      const searchResult = await collection
        .find({ ...filter }, { projection })
        .toArray();

      res.status(200).json({ searchResult });

      client.close();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
