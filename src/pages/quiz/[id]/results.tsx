import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Auth } from "../../../modules/auth/Auth";
import { useRouter } from "next/dist/client/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/db";
import { Link } from "@mui/material";

const ResultsPage: NextPage = () => {
  const [result, setResult] = useState({
    score: 0,
    of: 0,
    title: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) return;
    const query = doc(
      db,
      `results/${router.query.id}`
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
        <div className="text-gray-400">{result.title}</div>
      </div>
      <div className="md:w-3/4 xl:w-1/2 flex flex-col items-center mx-2 my-8 md:mx-auto rounded-lg p-7 bg-gray-600">
        <div className="text-white font-semibold text-4xl">
          Ваши ответы буду рассмотрены!
        </div>
        <Link fontSize="24px" sx={{ mt: 2 }} color="#ffffff" href="/">
            Вернуться на главную
        </Link>
      </div>
    </Auth>
  );
};

export default ResultsPage;
