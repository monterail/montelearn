import React, { FunctionComponent } from "react";

type Props = {
  isCorrect: boolean;
  className?: string;
};

const QuestionLabel: FunctionComponent<Props> = ({ isCorrect, className, children }) => {
  const classes = isCorrect ? "bg-green-100 text-green-200" : "text-black bg-gray-200";
  return (
    <div className={`px-6 py-4 rounded-lg font-roboto-mono font-medium ${classes} ${className}`}>
      <span role="img" aria-label="emoji">
        {isCorrect ? "🎉 Correct" : "💀 Wrong"}
      </span>
      {children}
    </div>
  );
};

export default QuestionLabel;
