import React from "react";
import { COLOR_MILANO_RED, COLOR_RED, FONT_SANS_SERIF_MONO } from "@/theming/const";
import { rem } from "@/theming/utils";
import StyledFlexContainer from "../Container/StyledFlexContainer";

const PageHeader = () => {
  return (
    <StyledFlexContainer css={{ justifyContent: "space-between", alignItems: "center" }}>
      <div css={{ display: "flex", alignItems: "center", height: rem(90) }}>
        <img css={{ flexShrink: 0 }} alt="Logo" src="/images/monteLogo.svg" />
        <div>
          <span css={{ fontWeight: "bold", fontSize: rem(24) }}>monte</span>
          <span css={{ color: COLOR_RED, fontWeight: "bold", fontSize: rem(24) }}>learn</span>
        </div>
      </div>
      <div css={{ textTransform: "uppercase", fontFamily: FONT_SANS_SERIF_MONO }}>
        Developed with <span css={{ color: COLOR_MILANO_RED }}>&#9829;</span> by Monterail
      </div>
    </StyledFlexContainer>
  );
};

export default PageHeader;
