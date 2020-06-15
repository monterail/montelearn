import { FunctionComponent } from "react";
import Link from "next/link";

import SvgArrowLeft from "@/components/svg/SvgArrowLeft";
import SvgArrowRight from "@/components/svg/SvgArrowRight";

import { BUTTON_DIRECTIONS } from "@/constants/buttonDirecitons";

type Props = {
  direction: BUTTON_DIRECTIONS;
  className?: string;
  withBorder?: boolean;
  href: string;
  as?: string;
};

const LinkWithArrow: FunctionComponent<Props> = ({
  href,
  as,
  direction = BUTTON_DIRECTIONS.RIGHT,
  children,
  className = "",
  withBorder = true,
}) => {
  const directionClass = direction === BUTTON_DIRECTIONS.RIGHT ? "pr-4" : "pl-4";
  const borderClasses = withBorder
    ? `px-6 border-2 border-black`
    : `pr-2 pl-4 sm:px-4 border-0 sm:border-2 border-black`;

  return (
    <Link data-testid="link" href={href} as={as}>
      <a
        className={`
        inline-block py-2 whitespace-no-wrap hover:opacity-50 transition-opacity
        duration-200 bg-transparent rounded-full font-roboto-mono
        ${borderClasses} ${className}
      `}
      >
        <div className="flex">
          {direction === BUTTON_DIRECTIONS.LEFT && <SvgArrowLeft />}
          <span className={`${directionClass} text-sm sm:text-base font-medium`}>{children}</span>
          {direction === BUTTON_DIRECTIONS.RIGHT && <SvgArrowRight />}
        </div>
      </a>
    </Link>
  );
};

export default LinkWithArrow;
