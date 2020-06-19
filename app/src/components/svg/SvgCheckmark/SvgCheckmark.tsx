import { FunctionComponent } from "react";

type Props = {
  isCorrect?: boolean;
};

const SvgCheckmark: FunctionComponent<Props> = ({ isCorrect }) => {
  return (
    <svg
      data-testid="svg-checkmark"
      width="19"
      height="16"
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6.68421L8.28125 13L16 3"
        stroke={isCorrect ? "#219653" : "#EC1115"}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SvgCheckmark;
