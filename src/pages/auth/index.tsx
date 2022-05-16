import { NextPage } from "next";
import { useState } from "react";
import { Button } from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AuthPage: NextPage = () => {
  const [username, setUsername] = useState('')
  const { login } = useAuth()

  const submitHandler = () => {
    if (username) { 
      toast.success("Успешно!")
      login(username)
    } else {
      toast.error("Ошибка авторизации!")
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="px-12 py-4 flex flex-col space-y-4 items-center rounded-lg">
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Ваше имя пользователя" />
          <Button onClick={submitHandler} color="blue" disabled={!!username.length}>
            Продолжить
          </Button>
      </div>
    </div>
  );
};

export default AuthPage;
