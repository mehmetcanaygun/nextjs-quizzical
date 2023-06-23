import { Quiz } from "@/types";
import { GetServerSideProps } from "next";

type QuizPageProps = {
  quiz: Quiz;
};

type QueryParams = {
  id: string;
};

const QuizPage: React.FC<QuizPageProps> = ({ quiz }) => {
  return <div>QuizPage</div>;
};

export default QuizPage;
