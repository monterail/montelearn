import React, { FunctionComponent } from "react";

import ButtonWithArrow from "@/components/ButtonWithArrow";

import { BUTTON_DIRECTIONS } from "@/constants/buttonDirecitons";

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
        <li key={index} className={`capitalize text-sm sm:text-base ${isLast ? "text-black" : ""}`}>
          {el}
          {!isLast && <span className="px-1 sm:px-4">/</span>}
        </li>
      );
    });

  return (
    <div className="sm:p-6 bg-red-100 flex flex-row font-roboto-mono">
      {back && (
        <ButtonWithArrow
          onClick={handleBackClick}
          direction={BUTTON_DIRECTIONS.LEFT}
          withBorder={false}
        >
          <span className="font-medium hidden sm:block">Back</span>
        </ButtonWithArrow>
      )}
      <ul className="flex items-center h-6 sm:px-4 font-medium text-red-200 cursor-default my-4">
        {renderElements()}
      </ul>
    </div>
  );
};

Breadcrumbs.defaultProps = {
  options: [],
  back: true,
};

export default Breadcrumbs;
