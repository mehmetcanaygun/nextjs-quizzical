import { Quiz } from "@/types";
import Link from "next/link";
import Image from "next/image";
import ClockIcon from "@/public/assets/clock.svg";
import { formatDate } from "@/utils";

type QuizCardProps = {
  quiz: Quiz;
};

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  return (
    <li className="bg-light rounded shadow hover:bg-secondary transition">
      <Link
        href={`/quiz/${quiz._id}`}
        className="h-28 p-2 flex items-center gap-4"
      >
        <div className="w-24 aspect-square rounded-lg bg-white">
          <Image src={ClockIcon} alt="Quiz image" width={100} height={100} />
        </div>

        <div>
          <p className="font-bold">{quiz.genre}</p>
          <p>
            Created by <span className="text-info font-bold">{quiz.owner}</span>
          </p>
          <p>
            <span className="text-info font-bold">
              {quiz.participantAmount}
            </span>{" "}
            participants
          </p>
          <p className="text-gray-400 text-sm">{formatDate(quiz.createdAt)}</p>
        </div>
      </Link>
    </li>
  );
};

export default QuizCard;
