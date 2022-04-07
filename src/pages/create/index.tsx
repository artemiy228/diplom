import { collection, doc, setDoc } from "firebase/firestore";
import { NextPage } from "next";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../../components/Button";
import { db } from "../../lib/db";
import { Auth } from "../../modules/auth/Auth";
import { QuestionForm } from "../../modules/create/QuestionForm";
import { Question } from "../../types/common/Question";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useRouter } from "next/dist/client/router";

const CreateQuiz: NextPage = () => {
  const [title, setTitle] = useState("");
  const [forms, setForms] = useState<Question[]>([]);
  const router = useRouter();

  const addQuestion = () => {
    setForms([
      ...forms,
      {
        label: "",
        correct: 0,
        variants: [],
      },
    ]);
  };

  const changeLabel = (ind: number) => (label: string) => {
    const newForms = forms.map((form, index) => {
      if (index === ind) {
        return { ...form, label };
      }
      return form;
    });
    setForms(newForms);
  };

  const addVariant = (ind: number) => () => {
    const newForms = forms.map((form, index) => {
      if (index === ind) return { ...form, variants: [...form.variants, ""] };
      return form;
    });
    setForms(newForms);
  };

  const chooseCorrect = (ind: number) => (correct: number) => {
    const newForms = forms.map((form, index) => {
      if (index === ind) {
        return { ...form, correct };
      }
      return form;
    });
    setForms(newForms);
  };

  const changeVariant =
    (ind: number) => (variantIndex: number, value: string) => {
      const newForms = forms.map((form, index) => {
        if (index === ind) {
          return {
            ...form,
            variants: form.variants.map((variant, index) =>
              variantIndex === index ? value : variant
            ),
          };
        }
        return form;
      });
      setForms(newForms);
    };

  const deleteVariant = (ind: number) => (variantIndex: number) => {
    const newForms = forms.map((form, index) => {
      if (index === ind) {
        return {
          ...form,
          variants: form.variants.filter((_, i) => i !== variantIndex),
        };
      }
      return form;
    });
    setForms(newForms);
  };

  function submit() {
    const id = uuid();
    setDoc(doc(db, "quizzes", id), {
      id,
      title,
      questions_length: forms.length,
      questions: forms,
    })
      .then(() => router.push(`/quiz/${id}`))
      .catch((err) => toast.error("Ошибка при опубликации опроса"));
  }

  return (
    <Auth>
      <div className="flex items-center justify-between p-4 border-dashed border-b-2 border-gray-600">
        <div className="text-white text-xl font-semibold"></div>
        <Button onClick={submit} color="blue">
          Опубликовать
        </Button>
      </div>
      <div className="md:mx-auto mx-5 md:w-1/2 my-5 space-y-4">
        <div className="rounded-md p-4 bg-gray-600 ">
          <TextareaAutosize
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent focus:outline-none w-full text-white text-3xl resize-none font-semibold"
            placeholder="Названия опроса"
          />
        </div>
        {forms.map((form, index) => (
          <QuestionForm
            deleteVariant={deleteVariant(index)}
            changeVariant={changeVariant(index)}
            chooseCorrect={chooseCorrect(index)}
            addVariant={addVariant(index)}
            changeLabel={changeLabel(index)}
            key={index}
            {...form}
          />
        ))}
        <div className="flex items-center">
          <Button onClick={addQuestion} color="gray">
            Добавить вопрос
          </Button>
        </div>
      </div>
    </Auth>
  );
};

export default CreateQuiz;
