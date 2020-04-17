import { useState, useCallback, useMemo, createContext, useContext } from "react";

import { rem } from "@/theming/utils";
import { pluralize } from "@/utils/wording";

const chevronRight = (
  <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16">
    <path fill="#fff" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

const chevronUp = (
  <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16">
    <path fill="#fff" d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
  </svg>
);

const Ctx = createContext();

export function WithContext({ children }) {
  const [actives, setActives] = useState({});

  const toggle = useCallback(
    (id) => {
      const newActives = { ...actives };
      newActives[id] = !actives[id];

      setActives(newActives);
    },
    [actives],
  );

  const isActive = useMemo(() => {
    return (id) => !!actives[id];
  }, [actives]);

  return <Ctx.Provider value={{ active: actives, toggle, isActive }}>{children}</Ctx.Provider>;
}

const tab = <>&nbsp;&nbsp;</>;

function Revealable({ children, id }) {
  const { isActive, toggle } = useContext(Ctx);

  if (!id) {
    throw new Error("Missing id property");
  }

  const toggleSelf = useCallback(() => {
    toggle(id);
  }, [id, toggle]);

  const isOn = isActive(id);

  return (
    <>
      <button
        css={{
          WebkitAppearance: "none",
          MozAppearance: "none",
          appearance: "none",
          padding: 0,
          margin: 0,
          lineHeight: 0,
          border: "none",
          borderRadius: rem(4),
          backgroundColor: "#b3aac3",
          cursor: "pointer",
          ":hover": {
            opacity: 0.75,
          },
        }}
        onClick={toggleSelf}
        type="button"
      >
        {isOn ? chevronUp : chevronRight}
      </button>
      {isOn && children}
    </>
  );
}

function RecursiveReveal({ css, value, ...props }) {
  if (typeof value === "undefined") {
    return (
      <span css={{ ...css, color: "grey" }} {...props}>
        undefined
      </span>
    );
  }

  if (typeof value === "number") {
    return (
      <span css={{ ...css }} {...props}>
        {JSON.stringify(value)}
      </span>
    );
  }

  if (value === null) {
    return (
      <span css={{ ...css, color: "grey" }} {...props}>
        NULL
      </span>
    );
  }

  if (value instanceof Date) {
    return (
      <span css={{ ...css }} {...props}>
        Date ({value.toISOString()})
      </span>
    );
  }

  if (Array.isArray(value)) {
    return (
      <span css={{ ...css }} {...props}>
        Array ({pluralize(value.length, "element", "elements")}) [
        {value.length > 0 && (
          <Revealable id={JSON.stringify(value)}>
            {value.map((el, index) => (
              <div key={index} css={{ display: "flex", flexWrap: "wrap" }}>
                {tab}
                {index}: <RecursiveReveal value={el} />
              </div>
            ))}
          </Revealable>
        )}
        ]
      </span>
    );
  }

  if (typeof value === "object") {
    const nodes = [];

    for (const k in value) {
      if (Object.prototype.hasOwnProperty.call(value, k)) {
        nodes.push(
          <div key={k}>
            {tab}
            {k}: <RecursiveReveal value={value[k]} />
          </div>,
        );
      }
    }

    return (
      <span css={{ ...css }} {...props}>
        Object ({pluralize(nodes.length, "key", "keys")}) &#123;
        {nodes.length > 0 && <Revealable id={JSON.stringify(value)}>{nodes}</Revealable>}
        &#125;
      </span>
    );
  }

  return (
    <span css={{ ...css }} {...props}>
      {JSON.stringify(value)}
    </span>
  );
}

export default RecursiveReveal;
