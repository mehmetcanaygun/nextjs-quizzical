import { useState } from "react";
import Image from "next/image";
import { getQuizOptions } from "@/services";
import QuizOptions from "@/components/quiz/QuizOptions";
import NewQuestions from "@/components/quiz/NewQuestions";
import { Question, QuizOptions as QuizOptionsType } from "@/types";
import Edit2Icon from "@/public/assets/edit-2.svg";
import TrashIcon from "@/public/assets/trash.svg";

type CreatePageProps = {
  quizOptions: QuizOptionsType;
};

const CreatePage: React.FC<CreatePageProps> = ({ quizOptions }) => {
  // State
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const difficulty = e.target.value;

    setSelectedDifficulty(difficulty);
  };

  const handleSetQuestions = (newQuestion: Question) => {
    setQuestions((prev) => [...prev, newQuestion]);
  };

  return (
    <div className="flex flex-col gap-4">
      <QuizOptions
        quizOptions={quizOptions}
        selectedCategory={selectedCategory}
        selectedDifficulty={selectedDifficulty}
        handleCategoryChange={handleCategoryChange}
        handleDifficultyChange={handleDifficultyChange}
      />

      <NewQuestions
        questions={questions}
        handleSetQuestions={handleSetQuestions}
      />

      {/* Question list */}
      {questions.length > 0 && (
        <div className="animate-slideUp flex flex-col gap-3">
          <div>
            <h3 className="text-primary pl-2 font-bold border-l-4 border-l-primary">
              Here's your question list
            </h3>
            <p className="text-sm text-gray-400">
              Take a final look before sending them.
            </p>
          </div>

          <ul className="flex flex-col gap-2">
            {questions.map((question, index) => (
              <li
                key={question.question}
                className="border rounded-md p-2 flex justify-between items-start gap-2"
              >
                <div>
                  <p className="mb-2">
                    <span className="text-primary font-bold">{index + 1}</span>.{" "}
                    {question.question}
                  </p>

                  <ul className="flex items-center gap-3">
                    {question.answers.map((answer) => (
                      <li
                        key={answer}
                        className={`text-sm py-1 px-2 rounded shadow ${
                          answer === question.correctAnswer
                            ? "bg-secondary"
                            : "bg-light"
                        }`}
                      >
                        {answer}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-1">
                  <button className="py-1 px-2 rounded bg-info text-light flex items-center gap-2">
                    <Image src={Edit2Icon} alt="Pen icon" width={16} />
                  </button>

                  <button className="py-1 px-2 rounded bg-danger text-light flex items-center gap-2">
                    <Image src={TrashIcon} alt="Pen icon" width={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  // Fetch options
  const quizOptions = await getQuizOptions();

  return {
    props: {
      quizOptions,
    },
  };
};

export default CreatePage;
