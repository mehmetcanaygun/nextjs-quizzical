import { formatDistanceToNow } from "date-fns";
import { Quiz } from "@/types";

const DUMMY_PUBLIC_QUIZZES: Quiz[] = [
  {
    _id: "1",
    owner: "user1",
    genre: "action",
    image: "https://source.unsplash.com/random/800x600",
    difficulty: "hard",
    createdAt: "2023-5-23",
    participantAmount: 5,
  },
  {
    _id: "2",
    owner: "user2",
    genre: "adventure",
    image: "https://source.unsplash.com/random/800x600",
    difficulty: "medium",
    createdAt: "2023-5-22",
    participantAmount: 3,
  },
  {
    _id: "3",
    owner: "user3",
    genre: "comedy",
    image: "https://source.unsplash.com/random/800x600",
    difficulty: "easy",
    createdAt: "2023-5-21",
    participantAmount: 2,
  },
  {
    _id: "4",
    owner: "user4",
    genre: "drama",
    image: "https://source.unsplash.com/random/800x600",
    difficulty: "hard",
    createdAt: "2023-5-20",
    participantAmount: 4,
  },
  {
    _id: "5",
    owner: "user5",
    genre: "horror",
    image: "https://source.unsplash.com/random/800x600",
    difficulty: "medium",
    createdAt: "2023-5-19",
    participantAmount: 6,
  },
];

export const fetchDummyQuizList = (): Promise<Quiz[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_PUBLIC_QUIZZES);
    });
  });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });
  return formattedDate;
};
