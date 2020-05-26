import React, { FunctionComponent } from "react";
import dynamic from "next/dynamic";

import { SUBJECT_ICONS } from "@/types/subject";

const SvgPotion = dynamic(() => import("@/components/svg/SvgPotion"));
const SvgNature = dynamic(() => import("@/components/svg/SvgNature"));
const SvgAtom = dynamic(() => import("@/components/svg/SvgAtom"));
const SvgWeather = dynamic(() => import("@/components/svg/SvgWeather"));
const SvgCastle = dynamic(() => import("@/components/svg/SvgCastle"));
const SvgBabushka = dynamic(() => import("@/components/svg/SvgBabushka"));

type Props = {
  className?: string;
  icon: SUBJECT_ICONS;
};

const renderIcon = (icon: SUBJECT_ICONS) => {
  switch (icon) {
    case SUBJECT_ICONS.POTION: {
      return <SvgPotion />;
    }
    case SUBJECT_ICONS.NATURE: {
      return <SvgNature />;
    }
    case SUBJECT_ICONS.ATOM: {
      return <SvgAtom />;
    }
    case SUBJECT_ICONS.WEATHER: {
      return <SvgWeather />;
    }
    case SUBJECT_ICONS.CASTLE: {
      return <SvgCastle />;
    }
    case SUBJECT_ICONS.BABUSHKA: {
      return <SvgBabushka />;
    }
    default: {
      return <SvgPotion />;
    }
  }
};

const SubjectIcon: FunctionComponent<Props> = ({ className = "", icon }) => {
  return (
    <div
      className={`flex justify-center items-center rounded-full bg-red-100 h-12 w-12 ${className}`}
    >
      {renderIcon(icon)}
    </div>
  );
};

SubjectIcon.defaultProps = {
  className: "",
};

export default SubjectIcon;
