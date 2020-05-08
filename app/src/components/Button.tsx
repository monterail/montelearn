import React, { FunctionComponent } from "react";

type Props = {
  className?: string;
  onClick?: () => void;
};

const Button: FunctionComponent<Props> = ({ children, className, onClick }) => {
  return (
    <button
      type="button"
      className={`
        flex py-5 px-10 border-2 font-medium text-white
        text-2xl bg-red-monterail rounded-full font-roboto-mono ${className}
      `}
      onClick={() => onClick}
    >
      {children}
    </button>
  );
};

export default Button;
