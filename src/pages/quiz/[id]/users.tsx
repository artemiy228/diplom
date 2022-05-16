import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { useRouter } from "next/dist/client/router"
import Link from "next/link"
import React, { useEffect, useMemo, useState } from "react"
import { db } from "../../../lib/db"
import { Auth } from "../../../modules/auth/Auth"

const Users = () => {
    const [users, setUsers] = useState<any>([])
    const [title, setTitle] = useState('')
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (!id) return
        const query = doc(db, "quizzes", router.query.id as string);
        getDoc(query).then((snapshot) => {
          if (snapshot.exists()) {
            setTitle(snapshot.data().title);
          }
        });
    }, [id])


    useEffect(() => {
        if (!id) return
        getDocs(collection(db, "quiz", router.query.id as string, "users")).then(snapshots => {
            const list = snapshots.docs.map((doc) => doc.data());
            console.log(list)
            setUsers(list)
        })
    }, [id])


    const us = useMemo(() => {
        const newUsers: string[] = []
        if (!users) return newUsers
        for(const { username } of users) {
            if (!newUsers.includes(username)){
                newUsers.push(username)
            }
        }
        return newUsers
    }, [users])

    return (
        <Auth>
            <div className="flex justify-center items-center">
                <div className="py-5 w-full mx-4 md:w-[70%]">
                    <div className="text-2xl text-white">Прошедшие {title}</div>
                    {us?.map(user => (
                        <Link key={user} href={`/quiz/${id}/user/${user}`}>
                            <div className="bg-gray-600 cursor-pointer text-white text-xl my-4 rounded border-2 p-4">
                                {user}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Auth>
    )
}

export default Users