import { useState } from "react";
import { getAllQuizzes, getQuizOptions, searchQuiz } from "@/services";
import QuizList from "@/components/quiz/QuizList";
import Header from "@/components/ui/Header";
import SearchQuiz from "@/components/quiz/SearchQuiz";
import Spinner from "@/components/ui/Spinner";
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
    <div className="flex flex-col gap-8">
      <Header />

      <SearchQuiz
        quizOptions={quizOptions}
        handleSearchQuiz={handleSearchQuiz}
        handleResetSearch={handleResetSearch}
      />

      {loading ? <Spinner /> : <QuizList quizList={displayedList} />}
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
