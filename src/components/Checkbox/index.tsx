import React from "react";
import { __DEV__ } from "../../constants/env";
import { CheckIcon } from "../CheckIcon";

export type CheckboxProps = {
  checked: boolean;
  onChange?: () => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <div
      onClick={() => onChange?.()}
      className={`${
        checked ? "p-1" : "p-3"
      } flex items-center justify-center rounded-full outline outline-[3px] ${
        checked && "bg-blue-500 outline-blue-500"
      } ${!checked && "outline-gray-600"}`}
    >
      {checked && <CheckIcon />}
    </div>
  );
};

if (__DEV__) {
  Checkbox.displayName = "Checkbox";
}
