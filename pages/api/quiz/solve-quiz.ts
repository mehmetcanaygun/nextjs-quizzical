import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/utils/db";
import { QuizDetail, SolveQuizParams } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* Get single quiz */
  if (req.method === "POST") {
    try {
      const client = await connectToDatabase();
      const db = client.db("nextjs-quiz-db");
      const collection = db.collection("quizzes");

      const { quizId, username, userAnswers } = req.body as SolveQuizParams;

      // Find related quiz
      const quiz = (await collection.findOne({
        _id: new ObjectId(quizId),
      })) as QuizDetail;

      if (!quiz) {
        res.status(500).json({ message: "No such quiz" });
        return;
      }

      // Control user answers with correct answers
      let score = 0;

      quiz.questions.forEach((q) => {
        const foundUserAnswer = userAnswers.find(
          (item) => item.question === q.question
        );

        if (foundUserAnswer && foundUserAnswer.answer === q.correctAnswer) {
          score++;
        }
      });

      // Update participants
      const newParticipant = { username, score };
      const updatedParticipants = [...quiz.participants, newParticipant].sort(
        (a, b) => b.score - a.score
      );

      await collection.updateOne(
        { _id: quiz._id },
        { $set: { participants: updatedParticipants } }
      );

      // Return "result" which is updated participants list
      res.status(200).json({ result: updatedParticipants });

      client.close();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
