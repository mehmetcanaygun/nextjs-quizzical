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

      const quizList = await collection
        .find({ isPublic: true }, { projection })
        .toArray();

      res.status(200).json({ quizList });

      client.close();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /* Create a quiz */
  if (req.method === "POST") {
    try {
      const client = await connectToDatabase();
      const db = client.db("nextjs-quiz-db");
      const collection = db.collection("quizzes");

      // Get request object
      const { owner, genre, difficulty, questions, isPublic } = req.body;

      // Create a new quiz object
      const now = new Date();
      const newQuiz = {
        owner,
        genre,
        difficulty,
        questions,
        isPublic,
        participants: [],
        createdAt: now,
        updatedAt: now,
      };

      // Insert the new quiz into the collection
      const { insertedId } = await collection.insertOne(newQuiz);

      // Return a success message as the response
      res
        .status(201)
        .json({ message: "Quiz created successfully", _id: insertedId });

      client.close();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
