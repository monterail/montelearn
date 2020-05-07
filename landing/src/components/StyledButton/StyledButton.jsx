import React from "react";
import { FONT_SANS_SERIF_MONO } from "@project/core/lib/const/theming";

export default function StyledButton({ style = {}, ...props }) {
  return (
    <button
      type="button"
      css={{
        height: "40px",
        borderRadius: "50px",
        border: "none",
        outline: "none",
        fontFamily: FONT_SANS_SERIF_MONO,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "22px",
        lineHeight: "50%",
        cursor: "pointer",
        ...style,
      }}
      {...props}
    />
  );
}
