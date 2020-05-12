import React, { FunctionComponent } from "react";
import dynamic from "next/dynamic";

import SubjectIconsType from "@/types/subjectIcons";

const SvgPotion = dynamic(() => import("@/components/svg/SvgPotion"));
const SvgNature = dynamic(() => import("@/components/svg/SvgNature"));
const SvgAtom = dynamic(() => import("@/components/svg/SvgAtom"));
const SvgWeather = dynamic(() => import("@/components/svg/SvgWeather"));
const SvgCastle = dynamic(() => import("@/components/svg/SvgCastle"));
const SvgBabushka = dynamic(() => import("@/components/svg/SvgBabushka"));

type Props = {
  className?: string;
  icon: SubjectIconsType;
};

const renderIcon = (icon: SubjectIconsType) => {
  switch (icon) {
    case "potion": {
      return <SvgPotion />;
    }
    case "nature": {
      return <SvgNature />;
    }
    case "atom": {
      return <SvgAtom />;
    }
    case "weather": {
      return <SvgWeather />;
    }
    case "castle": {
      return <SvgCastle />;
    }
    case "babushka": {
      return <SvgBabushka />;
    }
    default: {
      return <SvgPotion />;
    }
  }
};

const SubjectIcon: FunctionComponent<Props> = ({ className, icon }) => {
  return (
    <div
      className={`flex justify-center items-center rounded-full bg-red-100 h-12 w-12 ${className}`}
    >
      {renderIcon(icon)}
    </div>
  );
};

export default SubjectIcon;
