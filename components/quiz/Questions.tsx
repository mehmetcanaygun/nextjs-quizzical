import QuestionItem from "./QuestionItem";
import { Question } from "@/types";

type QuestionsProps = {
  questions: Question[];
  onAnswer: (question: string, answer: string) => void;
};

const Questions: React.FC<QuestionsProps> = ({ questions, onAnswer }) => {
  return (
    <div className="flex flex-col gap-6">
      {questions.map((q, index) => (
        <QuestionItem
          key={index}
          question={q}
          index={index}
          onAnswer={onAnswer}
        />
      ))}
    </div>
  );
};

export default Questions;
