import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/utils/db";
import { QuizDetail } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* Get single quiz */
  if (req.method === "GET") {
    try {
      const client = await connectToDatabase();
      const db = client.db("nextjs-quiz-db");
      const collection = db.collection("quizzes");

      const quizId = req.query.quizId as string;

      if (!quizId) {
        res.status(500).json({ message: "No such quiz" });
        return;
      }

      const quiz = (await collection.findOne({
        _id: new ObjectId(quizId),
      })) as QuizDetail;

      if (!quiz) {
        res.status(500).json({ message: "No such quiz" });
        return;
      }

      // Exclude correct answers
      const formattedQuiz = {
        ...quiz,
        questions: quiz.questions.map((q) => ({
          question: q.question,
          answers: q.answers,
        })),
      };

      res.status(200).json({ quiz: formattedQuiz });

      client.close();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
