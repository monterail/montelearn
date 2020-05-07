import React, { FunctionComponent } from "react";

import { ButtonWithArrow } from "@/components/ButtonWithArrow";

type Props = {
  options: string[];
  back?: boolean;
  handleBackClick?: () => void;
};

const Breadcrumbs: FunctionComponent<Props> = ({ options, back, handleBackClick }) => {
  const isLastElement = (index: number, length: number) => {
    return index === length - 1;
  };

  const renderElements = () =>
    options.map((el, index) => {
      const isLast = isLastElement(index, options.length);

      return (
        <li key={index} className={`capitalize ${isLast && "text-black"}`}>
          {el}
          {!isLast && <span className="px-4">/</span>}
        </li>
      );
    });

  return (
    <div className="p-6 bg-red-100 flex font-roboto-mono">
      {back && (
        <ButtonWithArrow onClick={handleBackClick} direction="left">
          Back
        </ButtonWithArrow>
      )}
      <ul className="flex items-center px-4 font-medium text-red-200">{renderElements()}</ul>
    </div>
  );
};

Breadcrumbs.defaultProps = {
  options: [],
  back: true,
};

export default Breadcrumbs;
