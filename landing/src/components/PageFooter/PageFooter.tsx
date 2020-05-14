import React from "react";
import { COLOR_MILANO_RED, FONT_SANS_SERIF_MONO } from "@project/core/lib/const/theming";
import { rem } from "@project/core/lib/utils/theming";
import StyledFlexContainer from "../Container/StyledFlexContainer";

const PageFooter = () => {
  return (
    <StyledFlexContainer
      css={{ justifyContent: "flex-end", alignItems: "center", height: rem(90) }}
    >
      <div css={{ textTransform: "uppercase", fontFamily: FONT_SANS_SERIF_MONO }}>
        Developed with <span css={{ color: COLOR_MILANO_RED }}>&#9829;</span> by Monterail
      </div>
    </StyledFlexContainer>
  );
};

export default PageFooter;
