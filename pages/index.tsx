import QuizList from "@/components/quiz/QuizList";
import Header from "@/components/ui/Header";
import { getAllQuizzes } from "@/services";
import { Quiz } from "@/types";

type HomePageProps = {
  quizList: Quiz[];
};

const HomePage: React.FC<HomePageProps> = ({ quizList }) => {
  return (
    <div>
      <Header />

      <h3 className="my-3 text-xl font-bold text-primary">Public quizzes</h3>

      <QuizList quizList={quizList} />
    </div>
  );
};

export async function getServerSideProps() {
  const quizList = await getAllQuizzes();

  return {
    props: {
      quizList,
    },
  };
}

export default HomePage;
