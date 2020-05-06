import { memo } from "react";

import { COLOR_GREEN, COLOR_WHITE } from "@project/core/lib/const/theming";
import { hexToRGBA, rem } from "@project/core/lib/utils/theming";

function Button({ css = {}, palette, size, ...props }) {
  return (
    <button
      type="submit"
      css={{
        MozAppearance: "none",
        WebkitAppearance: "none",
        backgroundColor: palette === "white" ? "transparent" : COLOR_GREEN,
        border: palette === "white" ? `1px solid ${COLOR_WHITE}` : "none",
        borderRadius: rem(100),
        color: COLOR_WHITE,
        cursor: "pointer",
        flexShrink: 0,
        fontFamily: "inherit",
        fontSize: size === "large" ? rem(20) : rem(14),
        margin: 0,
        minHeight: size === "large" ? rem(48) : rem(32),
        padding: rem(0, 20),
        ...css,

        ":hover": {
          backgroundColor:
            palette === "white" ? hexToRGBA(COLOR_WHITE, 0.2) : hexToRGBA(COLOR_GREEN, 0.75),
          ...css[":hover"],
        },
      }}
      {...props}
    />
  );
}

export default memo(Button);
