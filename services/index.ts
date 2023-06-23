import { getErrorMessage } from "@/utils";

const BASE_URL = "http://localhost:3000/api";

export const getAllQuizzes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/quiz`);

    if (!response.ok) {
      // To-do: Add notification
      console.log("Something went wrong.");
      return [];
    }

    const data = await response.json();

    return data.quizList;
  } catch (error) {
    // To-do: Add notification
    const errorMessage = getErrorMessage(error);
    console.log(errorMessage);

    return [];
  }
};
