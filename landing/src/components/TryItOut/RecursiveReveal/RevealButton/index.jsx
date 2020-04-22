import { useCallback } from "react";

export default function RevealButton({ css, onClick, onClickData, ...props }) {
  const handleClick = useCallback(() => {
    onClick(onClickData);
  }, [onClick, onClickData]);

  return (
    <button
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

        ...css,
      }}
      onClick={handleClick}
      type="button"
      {...props}
    >
      show/hide
    </button>
  );
}
