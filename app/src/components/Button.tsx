import React, { FC } from "react";

type Props = {
  className?: string;
  onClick?: VoidFunction;
};

const Button: FC<Props> = ({ children, className = "", onClick }) => (
  <button
    type="button"
    className={`
      flex font-medium text-white
      bg-red-monterail rounded-full font-roboto-mono
      ${className || ""}
    `}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
