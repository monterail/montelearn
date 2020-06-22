import { FunctionComponent } from "react";

type Props = {
  className?: string;
};

const Card: FunctionComponent<Props> = ({ className = "", children }) => {
  return (
    <div data-testid="card" className={`p-6 sm:p-8 md:p-10 shadow-custom rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
