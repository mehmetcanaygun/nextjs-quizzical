import { useState } from "react";
import { Question } from "@/types";
import { hasDuplicates, showToast } from "@/utils";

type NewQuestionsProps = {
  questions: Question[];
  handleSetQuestions: (newQuestion: Question) => void;
};

type CheckboxStateType = {
  answer1Check: boolean;
  answer2Check: boolean;
  answer3Check: boolean;
};

type AnswersStateType = {
  answer1: string;
  answer2: string;
  answer3: string;
};

const initialCheckboxState = {
  answer1Check: false,
  answer2Check: false,
  answer3Check: false,
};

const initialAnswersState = {
  answer1: "",
  answer2: "",
  answer3: "",
};

const NewQuestions: React.FC<NewQuestionsProps> = ({
  questions,
  handleSetQuestions,
}) => {
  // State
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<AnswersStateType>(initialAnswersState);
  const [checkboxState, setCheckboxState] =
    useState<CheckboxStateType>(initialCheckboxState);

  const handleAnswerCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name: checkboxName, checked: checkboxValue } = e.target;

    const updatedCheckboxState = {
      ...initialCheckboxState,
      [checkboxName]: checkboxValue,
    };

    setCheckboxState(updatedCheckboxState);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: answerName, value: answerValue } = e.target;

    const updatedAnswersState = {
      ...answers,
      [answerName]: answerValue,
    };

    setAnswers(updatedAnswersState);
  };

  const handleCheckQuestion = () => {
    // Check questions length
    if (questions.length === 10) {
      showToast("warn", "You cannot add more than 10 questions.");
      return;
    }

    // Check if question empty
    if (!newQuestion) {
      showToast("warn", "You should enter a question.");
      return;
    }

    // Check if question exists
    if (questions.find((q) => q.question === newQuestion)) {
      showToast("warn", "This question exists.");
      return;
    }

    // Check if there are 3 answers
    if (Object.values(answers).filter((answer) => !!answer).length < 3) {
      showToast("warn", "You should fill all answers.");
      return;
    }

    // Check if answers are same
    if (hasDuplicates(Object.values(answers))) {
      showToast("warn", "Some answers are the same.");
      return;
    }

    // Check if one of correct answer checkboxes is selected
    if (!Object.values(checkboxState).find((item) => item)) {
      showToast("warn", "You should check the correct answer.");
      return;
    }

    // Create new question object & add
    const checkedAnswer = Object.entries(checkboxState).find(
      ([key, value]) => value
    );

    if (!checkedAnswer) return;

    // Ex: answer2Check -> answer2
    const answerInputName = checkedAnswer[0].split("Check").shift();
    // Ex: ["answer2", "abc"]
    const foundAnswer = Object.entries(answers).find(
      ([key, value]) => key === answerInputName
    );

    if (!foundAnswer) return;

    const newQuestionItem = {
      question: newQuestion,
      answers: Object.values(answers),
      correctAnswer: foundAnswer[1],
    };

    handleSetQuestions(newQuestionItem);

    showToast("success", "Question is added.");

    // Reset states
    setNewQuestion("");
    setAnswers(initialAnswersState);
    setCheckboxState(initialCheckboxState);
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-primary font-bold">
        Create 5 to 10 questions with 3 answers for each
      </h3>

      {/* New question form */}
      <form>
        <div className="flex flex-col gap-4">
          {/* Question */}
          <div className="flex flex-col gap-1">
            <label htmlFor="newQuestion" className="text-sm text-gray-500">
              New question
            </label>
            <input
              id="newQuestion"
              type="text"
              placeholder="Enter your question here"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="border text-lg py-1 px-3 rounded bg-light text-dark"
            />
          </div>

          {/* Answers */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Answer 1 */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label htmlFor="answer1" className="text-sm text-gray-500">
                  Answer
                </label>

                <span className="text-sm text-gray-500">
                  Correct{" "}
                  <input
                    name="answer1Check"
                    type="checkbox"
                    checked={checkboxState.answer1Check}
                    onChange={handleAnswerCheckboxChange}
                  />
                </span>
              </div>

              <input
                id="answer1"
                name="answer1"
                type="text"
                placeholder="First answer"
                value={answers.answer1}
                onChange={handleAnswerChange}
                className="border text-lg py-1 px-3 rounded bg-light text-dark"
              />
            </div>

            {/* Answer 2 */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label htmlFor="answer2" className="text-sm text-gray-500">
                  Answer
                </label>

                <span className="text-sm text-gray-500">
                  Correct{" "}
                  <input
                    name="answer2Check"
                    type="checkbox"
                    checked={checkboxState.answer2Check}
                    onChange={handleAnswerCheckboxChange}
                  />
                </span>
              </div>

              <input
                id="answer2"
                name="answer2"
                type="text"
                placeholder="Second answer"
                value={answers.answer2}
                onChange={handleAnswerChange}
                className="border text-lg py-1 px-3 rounded bg-light text-dark"
              />
            </div>

            {/* Answer 3 */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label htmlFor="answer3" className="text-sm text-gray-500">
                  Answer
                </label>

                <span className="text-sm text-gray-500">
                  Correct{" "}
                  <input
                    name="answer3Check"
                    type="checkbox"
                    checked={checkboxState.answer3Check}
                    onChange={handleAnswerCheckboxChange}
                  />
                </span>
              </div>

              <input
                id="answer3"
                name="answer3"
                type="text"
                placeholder="Third answer"
                value={answers.answer3}
                onChange={handleAnswerChange}
                className="border text-lg py-1 px-3 rounded bg-light text-dark"
              />
            </div>
          </div>

          {/* Add button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCheckQuestion}
              className="bg-primary hover:bg-blue-600 text-light py-2 px-4 rounded-md shadow transition"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewQuestions;
