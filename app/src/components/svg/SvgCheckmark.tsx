import React from "react";

const SvgCheckmark = (props: any) => {
  return (
    <svg
      width="19"
      height="16"
      viewBox="0 0 19 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 6.68421L8.28125 13L16 3"
        stroke="#EC1115"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SvgCheckmark;
