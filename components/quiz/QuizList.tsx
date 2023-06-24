import { Fragment } from "react";
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
    <Fragment>
      <div className="flex justify-between items-center">
        <h3 className="my-3 text-xl font-bold text-primary">
          Challenge Your Mind, Embrace the Quest!
        </h3>
        <span className="text-sm text-gray-500">{quizList.length} results</span>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {quizList.map((quiz) => (
          <QuizCard key={quiz._id.toString()} quiz={quiz} />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuizList;
