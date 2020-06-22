import { FunctionComponent } from "react";

type Props = {
  className?: string;
};

const Title: FunctionComponent<Props> = ({ className = "", children }) => {
  return (
    <h1
      data-testid="title-spec"
      className={`text-4xl sm:text-5xl md:text-6xl lg:text-title font-semibold font-eczar break-words capitalize leading-none ${className}`}
    >
      {children}
    </h1>
  );
};

Title.defaultProps = {
  className: "",
};

export default Title;
