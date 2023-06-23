import { Quiz } from "@/types";
import Link from "next/link";
import { formatDate } from "@/utils";

type QuizCardProps = {
  quiz: Quiz;
};

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  return (
    <li className="bg-light rounded shadow hover:bg-secondary transition">
      <Link href={`/quiz/${quiz._id}`} className="h-28 p-2 flex flex-col">
        <p className="font-bold">{quiz.genre}</p>
        <p>
          Created by <span className="text-info font-bold">{quiz.owner}</span>
        </p>
        <p>
          <span className="text-info font-bold">
            {quiz.participants.length}
          </span>{" "}
          participants
        </p>
        <p className="text-gray-400 text-sm text-right">
          {formatDate(quiz.createdAt)}
        </p>
      </Link>
    </li>
  );
};

export default QuizCard;
