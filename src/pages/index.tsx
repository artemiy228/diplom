import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Auth } from "../modules/auth/Auth";
import { useEffect, useState } from "react";
import { db } from "../lib/db";
import { getDocs, collection } from "firebase/firestore";
import { Quiz } from "../types/common/Quiz";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  async function getQuizzes() {
    const notesSnapshot = await getDocs(collection(db, "quizzes"));
    const notesList = notesSnapshot.docs.map((doc) => doc.data());
    return notesList;
  }

  useEffect(() => {
    getQuizzes().then((list) => setQuizzes(list as Quiz[]));
  }, []);

  return (
    <Auth>
      <div className="flex justify-between items-center p-5">
        <input
          placeholder="Поиск опросов"
          className="px-2 bg-transparent w-11/12 border-l-2 border-gray-500 focus:outline-none text-white"
        />
        <div>
          <img
            className="w-8 h-8 rounded-full outline outline-1 outline-white"
            src={session?.user.image}
          />
        </div>
      </div>
      <div className="space-y-4 mx-5 my-2">
        {quizzes.map((quiz) => (
          <Link key={quiz.id} href={`/quiz/${quiz.id}`}>
            <div className="py-3 cursor-pointer px-4 flex items-center justify-between rounded-md bg-gray-600">
              <div className="text-white text-lg font-medium">{quiz.title}</div>
              <div className="text-gray-400 text-md">
                {quiz.questions_length} вопросов
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Auth>
  );
};

export default Home;
