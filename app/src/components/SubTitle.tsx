import React, { FunctionComponent } from "react";

type Props = {
  className?: string;
};

const SubTitle: FunctionComponent<Props> = ({ className, children }) => {
  return (
    <h2
      className={`text-3xl sm:text-4xl mb-4 font-semibold leading-tight break-words capitalize ${className}`}
    >
      {children}
    </h2>
  );
};

export default SubTitle;
