import React, { FunctionComponent } from "react";

import SvgArrowLeft from "@/components/svg/SvgArrowLeft";

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
        <li key={index} className={`capitalize text-sm sm:text-base ${isLast && "text-black"}`}>
          {el}
          {!isLast && <span className="px-1 sm:px-4">/</span>}
        </li>
      );
    });

  return (
    <div className="sm:p-6 bg-red-100 flex flex-row font-roboto-mono">
      {back && (
        <button
          onClick={handleBackClick}
          type="button"
          className="flex py-2 pr-2 pl-4 sm:px-4 border-0 sm:border-2 border-black bg-transparent rounded-full font-roboto-mono hover:opacity-50 transition-opacity duration-200 whitespace-no-wrap"
        >
          <SvgArrowLeft />
          <span className="pl-4 font-medium hidden sm:block">Back</span>
        </button>
      )}
      <ul className="flex items-center sm:px-4 font-medium text-red-200 cursor-default my-4">
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
