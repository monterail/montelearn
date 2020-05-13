import React from "react";
import { rem } from "@project/core/lib/utils/theming";
import { FONT_SANS_SERIF_MONO } from "@project/core/lib/const/theming";

export default function StyledButton({ style = {}, ...props }) {
  return (
    <button
      type="button"
      css={{
        height: rem(40),
        borderRadius: rem(50),
        border: "none",
        outline: "none",
        fontFamily: FONT_SANS_SERIF_MONO,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: rem(22),
        lineHeight: "50%",
        cursor: "pointer",
        ...style,
      }}
      {...props}
    />
  );
}
