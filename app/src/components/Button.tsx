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
        flex font-medium text-white
        bg-red-monterail rounded-full font-roboto-mono ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
