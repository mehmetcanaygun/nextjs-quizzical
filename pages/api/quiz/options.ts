import type { NextApiRequest, NextApiResponse } from "next";
import { QuizOptions } from "@/types";

const quizOptions: QuizOptions = {
  categories: [
    "Science and Technology",
    "Movies and TV Shows",
    "Sports",
    "History",
    "Geography",
    "Art and Literature",
    "Music",
    "General Knowledge",
    "Food and Cuisine",
    "Animals and Nature",
  ],
  difficulties: ["Easy", "Medium", "Hard"],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* Get quiz options */
  if (req.method === "GET") {
    try {
      res.status(200).json({ quizOptions });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
