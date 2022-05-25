import React, { memo, useRef, useState } from "react";
import { Question } from "../../types/common/Question";
import TextareaAutosize from "react-textarea-autosize";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

interface QuestionFormProps extends Question {
  addVariant: VoidFunction;
  changeVariant: (index: number, value: string) => void;
  changeLabel: (value: string) => void;
  deleteVariant: (index: number) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = memo((props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setFocused] = useState(false);

  useOnClickOutside(containerRef, () => {
    setFocused(false);
  });

  return (
    <div
      ref={containerRef}
      onClick={() => setFocused(true)}
      className="p-4 rounded-md bg-gray-600"
    >
      <TextareaAutosize
        className="my-3 text-xl resize-none bg-transparent w-full focus:outline-none text-white"
        placeholder="Вопрос"
        value={props.label}
        onChange={(e) => props.changeLabel(e.target.value)}
      />

      <div className="space-y-2">
        {props.variants.map((variant, index) => (
          <div className="flex rounded-md space-x-2 items-center" key={index}>
            <div className="w-full">
              <input
                value={variant}
                onChange={(e) => props.changeVariant(index, e.target.value)}
                placeholder={`Вариант ${index + 1}`}
                className="text-white border-gray-500 w-full border-2 rounded-md focus:outline-none bg-transparent p-1 col-span-4 text-lg py-[4.25px]"
              />
            </div>
            {isFocused && (
              <div className="flex items-center space-x-2">
                <Button
                  color="error"
                  onClick={() => props.deleteVariant(index)}
                >
                  <Delete />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      {props.variants.length < 4 && (
        <button
          onClick={props.addVariant}
          type="button"
          className="px-4 py-2 rounded-md text-white my-3 bg-gray-500"
        >
          Добавить вариант
        </button>
      )}
    </div>
  );
});