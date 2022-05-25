import type { NextPage } from "next";
import Link from "next/link";
import { Auth } from "../modules/auth/Auth";
import { useEffect, useState } from "react";
import {  db, useAuth, useFirestore, useIsAdmin } from "../lib/db";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { Quiz } from "../types/common/Quiz";
import { AppBar, Box, Button, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import { Delete, Logout } from "@mui/icons-material";
import { ConfirmModal } from "../components/ConfirmModal";
import toast from "react-hot-toast";

const Home: NextPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const auth = useAuth()
  const { isAdmin } = useIsAdmin()
  const firestore = useFirestore()
  const [quizId, setQuizId] = useState<null | string>(null)
  const [isOpen, setOpen] = useState(false)

  async function getQuizzes() {
    const notesSnapshot = await getDocs(collection(db, "quizzes"));
    const notesList = notesSnapshot.docs.map((doc) => doc.data());
    return notesList;
  }

  useEffect(() => {
    getQuizzes().then((list) => setQuizzes(list as Quiz[]));
  }, []);

  const deleteQuiz = async (quizId: string) => {
    try {
      await deleteDoc(doc(db, "quizzes", quizId))
      toast.success("Опрос успешно удален!")
      setQuizzes(quizzes.filter(quiz => quiz.id !== quizId))
      setQuizId(null)
      setOpen(false)
    } catch {
      toast.error("Произошла ошибка во время удаления!")
    }
    
  }

  return (
    <Auth>
      <ConfirmModal isOpen={isOpen} title="Удалить опрос?" onReject={() => setOpen(false)} onResolve={() => deleteQuiz(quizId as string)} />
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <AppBar sx={{ p: 1, borderBottom: "1px solid silver" }} color="transparent" position="static">
          <Toolbar>
            <Typography color="white" variant="h4" component="div" sx={{ flexGrow: 1 }}>
              М-Эксперт
            </Typography>
            {isAdmin && (
              <Link href="/create">
                <Button variant="contained" color="primary">
                  Создать опрос
                </Button>
              </Link>
            )}
            <Button sx={{ p: 1.5 }} variant="text" color="error" onClick={() => signOut(auth)}>
              <Logout color="error" />
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {quizzes.map(quiz => (
        <Link href={`/quiz/${quiz.id}/${isAdmin ? 'users' : ""}`} key={quiz.id}>
          <Paper sx={{ my: 1.5, mx: 2, p: 2, cursor: "pointer", background: "rgb(75, 85, 99)" }} elevation={4}>
              <Stack justifyContent="space-between" direction="row" spacing={2}>
                  <Typography fontSize="18px" fontWeight={600} color="white">
                    {quiz.title}
                  </Typography>
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <Typography color="white">
                      {quiz.questions_length} вопросов
                    </Typography>
                    {isAdmin && (
                      <Button color="error" onClick={(e) => {
                        e.stopPropagation()
                        setOpen(true)
                        setQuizId(quiz.id)
                      }}>
                      <Delete/>
                      </Button>
                    )}
                  </Stack>
              </Stack>
          </Paper>
        </Link>
      ))}
    </Auth>
  );
};

export default Home;
