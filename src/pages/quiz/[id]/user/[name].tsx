import { Button } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { db } from "../../../../lib/db";
import { Admin } from "../../../../modules/admin/Admin";
import { Auth } from "../../../../modules/auth/Auth";

const UserResult: React.FC = () => {
    const [data, setData] = useState<any>({})
    const router = useRouter()
    const { name, id } = router.query

    useEffect(() => {
        const query = doc(
            db,
            `results/${id}/users/${name}`
          );
          getDoc(query).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data();
              setData(data);
            } else {
                setData(null)
            }
          });
    }, [name, id])


    if (!data?.questions) {
        return <div>Загрузка</div>
    }

    return (
        <Auth>
            <Admin />
            <div className="flex justify-center items-center">
            <div className="py-5 w-full mx-4 md:w-[70%]">
                <Button onClick={() => window.history.go(-1)}>Назад</Button>
                <div className="text-4xl my-2 text-white">Результаты пользователя <span className="font-semibold underline">{name}</span></div>
                <div className="my-5">
                    {data.questions.map(({ variants, label }: any, indx: number) => (
                        <div className="border-2 p-4 my-5 rounded bg-gray-600">
                            <div key={label} className="text-2xl text-white">{label}</div>
                            {variants.map((variant: string, index: number) => {
                                const isMatch = index === data.answers[indx]
                                return (
                                    <div key={index} className={`${isMatch ? "text-green-400" : "text-white"} m-2`}>
                                        {index + 1} {variant} {isMatch && <span>- ответ пользователя</span>}
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </Auth>
    )
}

export default UserResult