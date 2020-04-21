import { createContext, useContext, useState, useCallback, useMemo } from "react";

import { COLOR_DON_JUAN, COLOR_GREEN } from "@/theming/const";
import { rem } from "@/theming/utils";
import { isUrlLike } from "@/utils/paths";
import { pluralize } from "@/utils/wording";

const Ctx = createContext();

function WithContext({ children }) {
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

function RevealBtn(props) {
  return (
    <button
      {...props}
      css={{
        WebkitAppearance: "none",
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
      type="button"
    >
      show/hide
    </button>
  );
}

function RecursiveReveal({ id, value }) {
  const { isActive, toggle } = useContext(Ctx);

  if (!id) {
    throw new Error("Missing id property");
  }

  if (value === null) {
    return <span>NULL</span>;
  }

  if (typeof value === "undefined") {
    return <span css={{ color: "#aa0" }}>undefined</span>;
  }

  if (typeof value === "boolean") {
    return <span>{value.toString()}</span>;
  }

  if (Array.isArray(value)) {
    return (
      <>
        <span>
          <span css={{ color: COLOR_DON_JUAN }}>Array</span>{" "}
          <i css={{ fontSize: rem(10) }}>
            ({value.length > 0 ? pluralize(value.length, "element", "elements") : "empty"})
          </i>{" "}
          {value.length > 0 && <RevealBtn onClick={() => toggle(id)} />}
        </span>
        {isActive(id) && (
          <div css={{ marginLeft: "1em" }}>
            {value.map((el, idx) => (
              <div key={idx}>
                <span css={{ color: COLOR_GREEN }}>{idx}</span>:{" "}
                <RecursiveReveal id={`${id}.${idx}`} value={el} />
              </div>
            ))}
          </div>
        )}
      </>
    );
  }

  if (value instanceof Date) {
    return <span>Date ({value.toISOString()})</span>;
  }

  if (typeof value === "object") {
    const keys = Object.keys(value);
    const keysLen = keys.length;

    return (
      <>
        <span>
          <span css={{ color: COLOR_DON_JUAN }}>Object</span>{" "}
          <i css={{ fontSize: rem(10) }}>
            ({keysLen > 0 ? pluralize(keysLen, "key", "keys") : "empty"})
          </i>{" "}
          {keysLen > 0 && <RevealBtn onClick={() => toggle(id)} />}
        </span>
        {isActive(id) && (
          <div css={{ marginLeft: "1em" }}>
            {keys.map((k) => (
              <div key={k}>
                <span css={{ color: COLOR_GREEN }}>{k}</span>:{" "}
                <RecursiveReveal id={`${id}.${k}`} value={value[k]} />
              </div>
            ))}
          </div>
        )}
      </>
    );
  }

  if (typeof value === "string" && isUrlLike(value)) {
    return (
      <a rel="noopener noreferrer" href={value} target="_blank">
        {value}
      </a>
    );
  }

  return <>{JSON.stringify(value)}</>;
}

export default function (props) {
  return (
    <WithContext>
      <RecursiveReveal {...props} />
    </WithContext>
  );
}
