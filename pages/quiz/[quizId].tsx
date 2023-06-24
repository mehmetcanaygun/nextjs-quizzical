import { Fragment, useState } from "react";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { getSingleQuiz, solveQuiz } from "@/services";
import Questions from "@/components/quiz/Questions";
import ResultModal from "@/components/quiz/ResultModal";
import Spinner from "@/components/ui/Spinner";
import { Participant, QuizDetail, SolveQuizParams, UserAnswer } from "@/types";
import { formatDate, generateUniqueUserTag, showToast } from "@/utils";
import HashIcon from "@/public/assets/Hash.svg";
import ZapIcon from "@/public/assets/zap.svg";

type QuizPageProps = {
  quizDetail: QuizDetail;
};

const QuizPage: React.FC<QuizPageProps> = ({ quizDetail }) => {
  // State
  const [loading, setLoading] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [username, setUsername] = useState<string>("");
  const [result, setResult] = useState<Participant[]>([]);
  const [resultModalVisible, setResultModalVisible] = useState<boolean>(false);

  const onAnswer = (question: string, answer: string) => {
    const newUserAnswer = { question, answer };
    const currentAnswers = [...userAnswers];

    const found = currentAnswers.find((item) => item.question === question);

    if (found) {
      // Update
      const updatedAnswers = currentAnswers.map((item) => {
        if (item.question === found.question) {
          return {
            question: item.question,
            answer,
          };
        }

        return item;
      });

      setUserAnswers(updatedAnswers);
    } else {
      // Push
      setUserAnswers((prev) => [...prev, newUserAnswer]);
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onModalClose = () => {
    setUsername("");
    setUserAnswers([]);
    setResultModalVisible(false);
  };

  const handleSolveQuiz = async () => {
    if (!username) {
      showToast("warn", "You need to enter a username.");
      return;
    }

    if (!quizDetail) return;

    const params: SolveQuizParams = {
      quizId: quizDetail._id.toString()!,
      username: `${username}${generateUniqueUserTag()}`,
      userAnswers,
    };

    setLoading(true);
    const result = await solveQuiz(params);
    setLoading(false);

    if (result) {
      // Show the result which is the updated participants list
      setResult(result);
      setResultModalVisible(true);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!quizDetail) {
    return <p className="text-gray-500">There's nothing to show...</p>;
  }

  return (
    <Fragment>
      {resultModalVisible && (
        <ResultModal
          title="Result"
          result={result}
          onModalClose={onModalClose}
        />
      )}

      <div className="flex flex-col gap-10">
        {/* Quiz header info */}
        <div className="flex flex-col items-start gap-2 md:flex-row md:justify-between">
          <div>
            <h3 className="text-xl mb-2">
              Created by{" "}
              <span className="text-primary">{quizDetail.owner}</span>{" "}
              {formatDate(quizDetail.createdAt)}.
            </h3>
            <p className="text-sm text-gray-500">{quizDetail._id.toString()}</p>
          </div>

          <div className="flex flex-row md:flex-col items-end justify-between gap-2">
            <span className="flex gap-2">
              <Image src={HashIcon} alt="hash icon" /> {quizDetail.genre}
            </span>
            <span className="flex gap-2">
              <Image src={ZapIcon} alt="hash icon" /> {quizDetail.difficulty}
            </span>
          </div>
        </div>

        {/* Questions */}
        <Questions questions={quizDetail.questions} onAnswer={onAnswer} />

        <div className="flex justify-end gap-2">
          <input
            type="text"
            placeholder="What's your name?"
            value={username}
            onChange={handleUserNameChange}
            className="py-2 px-4 rounded-md shadow"
          />

          <button
            disabled={userAnswers.length !== quizDetail.questions.length}
            onClick={handleSolveQuiz}
            className="bg-primary hover:bg-blue-600 text-light py-2 px-4 rounded-md shadow transition"
          >
            Send
          </button>
        </div>

        {/* Participants */}
      </div>
    </Fragment>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { quizId } = context.query;
  const quizDetail = await getSingleQuiz(quizId as string);

  return {
    props: {
      quizDetail,
    },
  };
}

export default QuizPage;
