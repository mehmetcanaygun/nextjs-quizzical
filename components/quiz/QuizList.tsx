import QuizCard from "./QuizCard";
import { Quiz } from "@/types";

type QuizListProps = {
  quizList: Quiz[];
};

const QuizList: React.FC<QuizListProps> = ({ quizList }) => {
  if (quizList.length === 0) {
    return <p className="text-gray-500">There's nothing to show...</p>;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {quizList.map((quiz) => (
        <QuizCard key={quiz._id} quiz={quiz} />
      ))}
    </ul>
  );
};

export default QuizList;
