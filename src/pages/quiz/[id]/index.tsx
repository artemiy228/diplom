import React, { useEffect, useMemo, useState } from "react";
import { NextPage } from "next";
import { Checkbox } from "../../../components/Checkbox";
import { Auth } from "../../../modules/auth/Auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../lib/db";
import { useRouter } from "next/dist/client/router";
import { Quiz } from "../../../types/common/Quiz";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const QuizPage: NextPage = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentVariant, setCurrentVariant] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const questionHalf = useMemo(
    () => 100 / (quiz?.questions_length || 1),
    [quiz]
  );
  const [progress, setProgress] = useState(questionHalf);
  const [error, setError] = useState<null | string>(null);
  const isTheLastQuestion = currentIndex + 1 === quiz?.questions.length;
  const router = useRouter();
  const { data: session } = useSession();

  const question = useMemo(
    () => quiz?.questions[currentIndex],
    [currentIndex, quiz]
  );

  function checkVariant() {
    if (currentVariant === null) {
      setError("Укажите вариант ответа");
      return false;
    }
    if (question?.correct === currentVariant) {
      setScore(score + 1);
    }
    return true;
  }

  function handleAnswer() {
    if (!checkVariant()) return;
    setProgress(progress + questionHalf);
    setCurrentIndex(currentIndex + 1);
    setCurrentVariant(null);
    setError(null);
  }

  function finish() {
    if (!checkVariant()) return;
    const path = doc(
      db,
      "results",
      router.query.id as string,
      "users",
      session?.user.name as string
    );
    setDoc(path, { score, of: quiz?.questions_length, title: quiz?.title })
      .then((res) => {
        router.push(`/quiz/${router.query.id}/results`);
      })
      .catch(() => toast.error("Возникла ошибка"));
  }

  useEffect(() => {
    if (!router.query.id) return;
    const query = doc(db, "quizzes", router.query.id as string);
    getDoc(query).then((snapshot) => {
      if (snapshot.exists()) {
        setQuiz(snapshot.data() as Quiz);
      }
    });
  }, [router.query.id]);

  return (
    <Auth>
      <div className="w-full sm:flex sm:items-center space-y-4 sm:space-y-0 justify-between p-5 border-dashed border-b-2 border-gray-600">
        <div className="text-white text-3xl sm:text-2xl">Example Quiz</div>
        <div className="w-full sm:w-1/2 md:w-1/4 xl:w-1/5 outline outline-4 outline-gray-600 rounded-full bg-gray-700">
          <div
            className="bg-gradient-to-r transition-all duration-500 from-indigo-500 via-purple-500 to-pink-500 text-sm font-semibold max-w-full text-blue-100 text-center p-2 leading-none rounded-full"
            style={{ width: `${progress}%` }}
          >
            {" "}
            {progress}%
          </div>
        </div>
      </div>
      <div className="w-full xl:w-1/2 mx-auto py-2 sm:py-10 px-4 sm:px-10">
        <div className="text-white mb-5 sm:mb-10 font-medium text-lg sm:text-xl my-2 sm:my-5">
          {question?.label}
        </div>

        <div className="flex flex-col space-y-5 justify-end cursor-pointer transition-all duration-300">
          <div className="text-red-500 font-semibold text-lg">{error}</div>
          {question?.variants.map((variant, index) => (
            <div
              key={variant}
              onClick={() => setCurrentVariant(index)}
              className="rounded-lg p-3 px-5 outline outline-[3px] outline-gray-600 hover:outline-gray-500 transition-all duration-300"
            >
              <div className="text-white flex items-center">
                <Checkbox checked={index === currentVariant} />
                <div className="ml-3 select-none">{variant}</div>
              </div>
            </div>
          ))}
        </div>
        {isTheLastQuestion ? (
          <button
            onClick={finish}
            className="px-4 py-2 my-5 transition-all duration-300 active:bg-blue-700 hover:bg-blue-600 float-right rounded-md bg-blue-500 text-white"
          >
            Завершить тест
          </button>
        ) : (
          <button
            onClick={handleAnswer}
            className="px-4 py-2 my-5 transition-all duration-300 active:bg-blue-700 hover:bg-blue-600 float-right rounded-md bg-blue-500 text-white"
          >
            Продолжить
          </button>
        )}
      </div>
    </Auth>
  );
};

export default QuizPage;