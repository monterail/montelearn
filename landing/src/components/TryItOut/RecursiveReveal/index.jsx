import { createContext, useCallback, useContext, useState } from "react";

import { COLOR_DON_JUAN, COLOR_GREEN } from "@/theming/const";
import { rem } from "@/theming/utils";
import { isUrlLike } from "@/utils/paths";
import { pluralize } from "@/utils/wording";

import RevealButton from "./RevealButton";

const Context = createContext();

function ValueReveal({ id, value }) {
  const { isActive, toggle } = useContext(Context);
  const expanded = isActive(id);

  if (value === null) {
    return <span>NULL</span>;
  }

  if (typeof value === "undefined") {
    return <span>undefined</span>;
  }

  if (Array.isArray(value)) {
    return (
      <>
        <span>
          <span css={{ color: COLOR_DON_JUAN }}>Array</span>{" "}
          <i css={{ fontSize: rem(10) }}>
            ({value.length > 0 ? pluralize(value.length, "element", "elements") : "empty"})
          </i>{" "}
          {value.length > 0 && <RevealButton onClick={() => toggle(id)} />}
        </span>
        {expanded && (
          <div css={{ marginLeft: "1em" }}>
            {value.map((el, idx) => (
              <div key={idx}>
                <span css={{ color: COLOR_GREEN }}>{idx}</span>:{" "}
                <ValueReveal id={`${id}.${idx}`} value={el} />
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
    const keysCount = keys.length;

    return (
      <>
        <span>
          <span css={{ color: COLOR_DON_JUAN }}>Object</span>{" "}
          <i css={{ fontSize: rem(10) }}>
            ({keysCount > 0 ? pluralize(keysCount, "key", "keys") : "empty"})
          </i>{" "}
          {keysCount > 0 && <RevealButton onClick={() => toggle(id)} />}
        </span>
        {expanded && (
          <div css={{ marginLeft: "1em" }}>
            {keys.map((key) => (
              <div key={key}>
                <span css={{ color: COLOR_GREEN }}>{key}</span>:{" "}
                <ValueReveal id={`${id}.${key}`} value={value[key]} />
              </div>
            ))}
          </div>
        )}
      </>
    );
  }

  if (typeof value === "string" && isUrlLike(value)) {
    return (
      <a
        css={{
          color: "inherit",
          ":not(:hover)": {
            textDecoration: "none",
          },
        }}
        href={value}
        rel="noopener noreferrer"
        target="_blank"
      >
        {value}
      </a>
    );
  }

  // It's important to stringify the value, so strings are rendered with quotes..
  return <span>{JSON.stringify(value)}</span>;
}

export default function RecursiveReveal(props) {
  const [actives, setActives] = useState({});

  const toggle = useCallback(
    (id) => {
      const newActives = { ...actives };
      newActives[id] = !actives[id];

      setActives(newActives);
    },
    [actives],
  );

  const isActive = useCallback(
    (id) => {
      return !!actives[id];
    },
    [actives],
  );

  return (
    <Context.Provider value={{ isActive, toggle }}>
      <ValueReveal {...props} />
    </Context.Provider>
  );
}
