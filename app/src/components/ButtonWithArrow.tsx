import React, { FunctionComponent } from "react";
import SvgArrowLeft from "@/components/SvgArrowLeft";
import SvgArrowRight from "@/components/SvgArrowRight";

type Props = {
  direction: "left" | "right";
  className?: string;
  onClick?: () => void;
};

export const ButtonWithArrow: FunctionComponent<Props> = ({
  direction,
  children,
  className,
  onClick,
}) => {
  const directionClass = direction.charAt(0);
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex py-2 px-6 border-2 border-black bg-transparent rounded-full font-roboto-mono ${className}`}
    >
      {direction === "left" && <SvgArrowLeft />}
      <span className={`p${directionClass}-4 font-medium`}>{children}</span>
      {direction === "right" && <SvgArrowRight />}
    </button>
  );
};
