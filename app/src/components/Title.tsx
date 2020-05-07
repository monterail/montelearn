import React, { FunctionComponent } from "react";

type Props = {
  className?: string;
};

const Title: FunctionComponent<Props> = ({ className, children }) => {
  return (
    <h1 className={`text-title font-semibold font-eczar break-words ${className}`}>{children}</h1>
  );
};

export default Title;
