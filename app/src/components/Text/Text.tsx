import { FunctionComponent } from "react";

type Props = {
  className?: string;
};

const Text: FunctionComponent<Props> = ({ className = "", children }) => {
  return (
    <p
      data-testid="text-spec"
      className={`text-base sm:text-lg leading-relaxed tracking-wide break-words ${className}`}
    >
      {children}
    </p>
  );
};

Text.defaultProps = {
  className: "",
};

export default Text;
