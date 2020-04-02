import { memo } from "react";

import { COLOR_WHITE } from "@/theming/const";
import { hexToRGBA, rem } from "@/theming/utils";

function CallToAction({ onClick }) {
  return (
    <button
      css={{
        backgroundColor: "transparent",
        border: `1px solid ${COLOR_WHITE}`,
        borderRadius: "100px",
        color: COLOR_WHITE,
        cursor: "pointer",
        flexShrink: 0,
        fontFamily: "inherit",
        fontSize: rem(20),
        margin: 0,
        minHeight: rem(48),
        MozAppearance: "none",
        padding: rem(0, 20),
        WebkitAppearance: "none",
        ":hover": {
          backgroundColor: hexToRGBA(COLOR_WHITE, 0.2),
        },
      }}
      onClick={onClick}
      type="button"
    >
      Try it out!
    </button>
  );
}

export default memo(CallToAction);
