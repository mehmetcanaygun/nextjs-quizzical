import QuizList from "@/components/quiz/QuizList";
import Header from "@/components/ui/Header";
import { Quiz } from "@/types";
import { fetchDummyQuizList } from "@/utils";

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
  const quizList = await fetchDummyQuizList();

  return {
    props: {
      quizList,
    },
  };
}

export default HomePage;
