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
        flex py-5 px-10 font-medium text-white
        sm:text-2xl bg-red-monterail rounded-full font-roboto-mono whitespace-no-wrap ${className}
      `}
      onClick={() => onClick}
    >
      {children}
    </button>
  );
};

export default Button;
