import { FunctionComponent } from "react";

import SvgArrowLeft from "@/components/svg/SvgArrowLeft";
import SvgArrowRight from "@/components/svg/SvgArrowRight";

import { BUTTON_DIRECTIONS } from "@/constants/buttonDirecitons";

type Props = {
  direction: BUTTON_DIRECTIONS;
  className?: string;
  withBorder?: boolean;
  onClick?: VoidFunction;
};

const ButtonWithArrow: FunctionComponent<Props> = ({
  direction,
  children,
  className = "",
  withBorder = true,
  onClick,
}) => {
  const directionClass = direction.charAt(0);
  const borderClasses = withBorder
    ? `px-6 border-2 border-black`
    : `pr-2 pl-4 sm:px-4 border-0 sm:border-2 border-black`;

  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        flex py-2 whitespace-no-wrap hover:opacity-50 transition-opacity
        duration-200 bg-transparent rounded-full font-roboto-mono
        ${borderClasses} ${className}
      `}
    >
      {direction === BUTTON_DIRECTIONS.LEFT && <SvgArrowLeft />}
      <span className={`p${directionClass}-4 text-sm sm:text-base font-medium`}>{children}</span>
      {direction === BUTTON_DIRECTIONS.RIGHT && <SvgArrowRight />}
    </button>
  );
};

export default ButtonWithArrow;
