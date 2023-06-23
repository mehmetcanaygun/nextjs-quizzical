import { ObjectId } from "mongodb";

export type Participant = {
  username: string;
  score: number;
};

export type Question = {
  question: string;
  answers: string[];
  correctAnswer: string;
};

export type UserAnswer = {
  question: string;
  answer: string;
};

export type Quiz = {
  _id: ObjectId;
  owner: string;
  genre: string;
  difficulty: string;
  createdAt: string;
  participants: Participant[];
};

export type QuizDetail = Quiz & {
  questions: Question[];
};

export type SolveQuizParams = {
  quizId: string;
  username: string;
  userAnswers: UserAnswer[];
};
