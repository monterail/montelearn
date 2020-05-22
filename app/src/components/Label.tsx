import React, { FunctionComponent } from "react";

type Props = {
  className?: string;
};

const Label: FunctionComponent<Props> = ({ className = "", children }) => {
  return <strong className={`font-bold text-red-300 ${className}`}>{children}</strong>;
};

export default Label;
