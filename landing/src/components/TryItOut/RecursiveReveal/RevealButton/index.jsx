import { useCallback } from "react";

export default function RevealButton({ onClick, onClickData, ...props }) {
  const handleClick = useCallback(() => {
    onClick(onClickData);
  }, [onClick, onClickData]);

  return (
    <button
      {...props}
      data-testid="RevealButton"
      css={{
        MozAppearance: "none",
        WebkitAppearance: "none",
        appearance: "none",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        margin: 0,
        padding: 0,

        ":hover": {
          textDecoration: "underline",
        },
      }}
      onClick={handleClick}
      type="button"
    >
      show/ hide
    </button>
  );
}
