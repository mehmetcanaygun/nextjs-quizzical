import { Fragment, useState } from "react";
import QuizList from "@/components/quiz/QuizList";
import Header from "@/components/ui/Header";
import SearchQuiz from "@/components/quiz/SearchQuiz";
import { getAllQuizzes, getQuizOptions, searchQuiz } from "@/services";
import { Quiz, QuizOptions, SearchQuizParams } from "@/types";

type HomePageProps = {
  quizList: Quiz[];
  quizOptions: QuizOptions;
};

const HomePage: React.FC<HomePageProps> = ({ quizList, quizOptions }) => {
  // State
  const [displayedList, setDisplayedList] = useState<Quiz[]>(quizList);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearchQuiz = async (params: SearchQuizParams) => {
    setLoading(true);
    const searchResult = await searchQuiz(params);
    setLoading(false);

    setDisplayedList(searchResult);
  };

  const handleResetSearch = async () => {
    setLoading(true);
    const searchResult = await getAllQuizzes();
    setLoading(false);

    setDisplayedList(searchResult);
  };

  return (
    <div>
      <Header />

      <h3 className="my-3 text-xl font-bold text-primary">Public quizzes</h3>

      <SearchQuiz
        quizOptions={quizOptions}
        handleSearchQuiz={handleSearchQuiz}
        handleResetSearch={handleResetSearch}
      />

      {loading ? (
        <h1 className="text-4xl text-center">LOADING...</h1>
      ) : (
        <QuizList quizList={displayedList} />
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const quizList = await getAllQuizzes();
  const quizOptions = await getQuizOptions();

  return {
    props: {
      quizList,
      quizOptions,
    },
  };
}

export default HomePage;
