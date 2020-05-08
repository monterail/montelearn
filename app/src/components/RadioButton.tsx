import React, { FunctionComponent, useState } from "react";
import SvgCheckmark from "@/components/SvgCheckmark";

const RadioButton: FunctionComponent = ({ children }) => {
  const [checked, setChecked] = useState<boolean | "false" | "mixed" | "true" | undefined>(
    undefined,
  );
  const isNotSelected = () => checked === undefined;
  const handleClick = () => {
    if (isNotSelected()) {
      setChecked(true);
      return;
    }
    setChecked(!checked);
  };
  const containerClass = checked ? "bg-red-monterail" : "bg-red-100";
  const textClass = checked ? "text-white" : "text-black";
  const circleClass = isNotSelected() ? "border-red-monterail" : "border-red-200";

  return (
    <div
      className={`inline-flex cursor-pointer rounded-full items-center py-4 pl-4 pr-8 transition-colors duration-100 ${containerClass}`}
      onClick={() => handleClick()}
      onKeyPress={(event) => (event.key === "Enter" ? handleClick() : null)}
      role="radio"
      aria-checked={checked}
      tabIndex={0}
    >
      <span
        className={`flex items-center content-center bg-white border-2 mr-4 rounded-full p-1 w-6 h-6 ${circleClass}`}
      >
        {checked && <SvgCheckmark />}
      </span>
      <span className={`font-medium text-xl font-roboto-mono select-none ${textClass}`}>
        {children}
      </span>
    </div>
  );
};

export default RadioButton;
