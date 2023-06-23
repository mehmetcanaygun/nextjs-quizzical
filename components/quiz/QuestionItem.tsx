import { useState } from "react";
import { Question } from "@/types";

type QuestionItemProps = {
  question: Question;
  index: number;
  onAnswer: (question: string, answer: string) => void;
};

const Questions: React.FC<QuestionItemProps> = ({
  question,
  index,
  onAnswer,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const handleAnswerClick = (a: string) => {
    setSelectedAnswer(a);

    onAnswer(question.question, a);
  };

  const btnClass = "flex-1 h-12 text-sm hover:bg-gray-200 transition";

  return (
    <div className="p-3 bg-light rounded-lg shadow-md animate-slideRight">
      <p className="text-2xl mb-4 text-dark">
        <span className="text-gray-400">{index + 1}</span>. {question.question}
      </p>

      {/* Answer buttons */}
      <div className="flex justify-between items-center gap-0.5 rounded-md overflow-hidden shadow-sm">
        {question.answers.map((a, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(a)}
            className={
              selectedAnswer === a
                ? `${btnClass} bg-secondary`
                : `${btnClass} bg-white`
            }
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;
