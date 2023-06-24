import { Fragment, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { getQuizOptions, createQuiz } from "@/services";
import QuizOptions from "@/components/quiz/QuizOptions";
import NewQuestions from "@/components/quiz/NewQuestions";
import Spinner from "@/components/ui/Spinner";
import { Question, QuizOptions as QuizOptionsType } from "@/types";
import TrashIcon from "../public/assets/trash.svg";
import { showToast } from "@/utils";

type CreatePageProps = {
  quizOptions: QuizOptionsType;
};

const CreatePage: React.FC<CreatePageProps> = ({ quizOptions }) => {
  // State
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [username, setUsername] = useState<string>("");
  const [privacy, setPrivacy] = useState<string>("Public");
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleDeleteQuestion = (questionItem: Question) => {
    const updatedQuestions = questions.filter(
      (q) => q.question !== questionItem.question
    );

    setQuestions(updatedQuestions);

    showToast("success", "Question is deleted.");
  };

  const handleCreateQuiz = async () => {
    // Check min questions length
    if (questions.length < 5) {
      showToast("warn", "You should add at least 5 questions.");
      return;
    }

    // Check if category & difficulty is selected
    if (!selectedCategory || !selectedDifficulty) {
      showToast("warn", "You should select both category and difficulty.");
      return;
    }

    // Check username
    if (!username) {
      showToast("warn", "You should enter your name.");
      return;
    }

    // Create request object
    const params = {
      owner: username,
      genre: selectedCategory,
      difficulty: selectedDifficulty,
      questions,
      isPublic: privacy === "Public",
    };

    // Make request
    setLoading(true);
    const data = await createQuiz(params);
    setLoading(false);

    if (!data) {
      showToast("error", "Quiz could not be created.");
    }

    const { message, _id } = data;

    // To-do: Notification
    alert(`${message}. Quiz ID is: ${_id}`);

    // Clear state
    setSelectedCategory("");
    setSelectedDifficulty("");
    setQuestions([]);
    setUsername("");
    setPrivacy("");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Head>
        <title>Quizzical: Create a new quiz</title>
        <meta name="description" content="Quizzical: Create a new quiz" />
      </Head>

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
                      <span className="text-primary font-bold">
                        {index + 1}
                      </span>
                      . {question.question}
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
                    <button
                      onClick={() => handleDeleteQuestion(question)}
                      className="py-1 px-2 rounded bg-danger hover:bg-rose-800 text-light flex items-center gap-2 transition"
                    >
                      <Image src={TrashIcon} alt="Pen icon" width={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Name, privacy and create button */}
        {questions.length >= 5 && (
          <div className="h-10 flex gap-2">
            <input
              type="text"
              placeholder="What's your name?"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="py-2 px-4 rounded-md shadow"
            />

            <select
              id="privacy"
              value={privacy}
              onChange={(e) => setPrivacy(e.target.value)}
              className="py-2 px-4 rounded-md shadow"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>

            <button
              onClick={handleCreateQuiz}
              className="text-xl font-bold bg-primary text-light hover:bg-blue-600 px-4 rounded-md shadow"
            >
              Create
            </button>
          </div>
        )}
      </div>
    </Fragment>
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
