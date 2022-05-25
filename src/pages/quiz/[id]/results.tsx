import React from "react";
import { NextPage } from "next";
import { Auth } from "../../../modules/auth/Auth";
import { Typography } from "@mui/material";
import NextLink from 'next/link'

const ResultsPage: NextPage = () => {
  return (
    <Auth>

      <div className="md:w-3/4 xl:w-1/2 flex flex-col items-center mx-2 my-8 md:mx-auto rounded-lg p-7 bg-gray-600">
        <div className="text-white font-semibold text-4xl">
          Ваши ответы буду рассмотрены!
        </div>
        <NextLink href="/">
          <Typography fontSize="24px" sx={{ mt: 2 }} color="#ffffff">
              Вернуться на главную
          </Typography>
        </NextLink>
      </div>
    </Auth>
  );
};

export default ResultsPage;
