import React from "react";
import SvgArrowLeft from "@/components/SvgArrowLeft";
import SvgArrowRight from "@/components/SvgArrowRight";

type Props = {
  direction: "left" | "right";
};

export const ButtonWithArrow = ({ direction }: Props) => {
  const directionClass = direction.charAt(0);
  return (
    <button type="button" className="flex py-2 px-6 border-2 border-black bg-red-100 rounded-full">
      {direction === "left" && <SvgArrowLeft />}
      <span className={`p${directionClass}-4 font-medium`}>Back</span>
      {direction === "right" && <SvgArrowRight />}
    </button>
  );
};
