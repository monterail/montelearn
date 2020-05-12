import React, { FunctionComponent } from "react";

type Props = {
  className?: string;
};

const Title: FunctionComponent<Props> = ({ className, children }) => {
  return (
    <h1
      className={`text-4xl sm:text-5xl md:text-6xl lg:text-title font-semibold font-eczar break-words capitalize ${className}`}
    >
      {children}
    </h1>
  );
};

export default Title;
