import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  color,
  className,
  disabled,
  ...props
}) => {
  const baseStyle = `bg-${color}-500 text-white rounded-md hover:bg-${color}-600 active:bg-${color}-700`;
  const btnClass = `py-2 px-4 text-lg ${baseStyle}`;

  const clns = className ? `${baseStyle} ${className}` : btnClass;

  return <button {...props} className={clns} />;
};
