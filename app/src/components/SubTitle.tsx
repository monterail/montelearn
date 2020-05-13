import React, { FunctionComponent } from "react";

type Props = {
  className?: string;
};

const SubTitle: FunctionComponent<Props> = ({ className, children }) => {
  return (
    <h2
      className={`text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight break-words capitalize ${className}`}
    >
      {children}
    </h2>
  );
};

SubTitle.defaultProps = {
  className: "",
};

export default SubTitle;
