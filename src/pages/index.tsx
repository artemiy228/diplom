import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Auth } from "../modules/auth/Auth";
import { useEffect, useState } from "react";
import { db } from "../lib/db";
import { getDocs, collection } from "firebase/firestore";
import { Quiz } from "../types/common/Quiz";

const Home: NextPage = () => {
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
      <div className="p-5 text-center text-3xl text-white">
        Эксперт-М
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
