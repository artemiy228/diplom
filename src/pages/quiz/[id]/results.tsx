import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Auth } from "../../../modules/auth/Auth";
import { useRouter } from "next/dist/client/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/db";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ResultsPage: NextPage = () => {
  const [result, setResult] = useState({
    score: 0,
    of: 0,
    title: "",
  });
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!router.query.id) return;
    const query = doc(
      db,
      `results/${router.query.id}/users/${session?.user.name}`
    );
    getDoc(query).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setResult(data as typeof result);
      }
    });
  }, [router.query]);

  return (
    <Auth>
      <div className="flex flex-col items-center p-5 border-dashed border-b-2 border-gray-600">
        <div className="text-white text-xl font-semibold">
          {result.score} / {result.of}
        </div>
        <div className="text-gray-400">{result.title}</div>
      </div>
      <div className="md:w-3/4 xl:w-1/2 flex flex-col items-center mx-2 my-8 md:mx-auto rounded-lg p-7 bg-gray-600">
        <div className="text-white font-semibold text-4xl">
          Вы делаете успехи!
        </div>
        <div className="text-center w-full md:w-4/5 my-4 text-gray-400 font-semibold text-lg">
          Даже если вы еще не знаете всех ответов, самопроверка — самый лучший
          способ их усвоить. Так держать!
        </div>
        <Link href="/">
          <button className="px-4 py-2 w-full sm:w-1/2 transition-all duration-300 active:bg-blue-700 hover:bg-blue-600 rounded-md bg-blue-500 text-white">
            Вернуться на главную
          </button>
        </Link>
      </div>
    </Auth>
  );
};

export default ResultsPage;
