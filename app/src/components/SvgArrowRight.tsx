import React from "react";

const SvgArrowLeft = (props: any) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0)">
        <path
          d="M0.75 11.503L23.25 11.503"
          stroke="#343541"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.5 7.75299L23.25 11.503L19.5 15.253"
          stroke="#343541"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect x="24" y="24" width="24" height="24" transform="rotate(180 24 24)" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SvgArrowLeft;
