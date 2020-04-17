import Head from "next/head";
import { useCallback, useState } from "react";

import Button from "@/components/Button";
import { FONT_MONOSPACE, COLOR_GREEN } from "@/theming/const";
import { rem } from "@/theming/utils";
import { ensureLeadingSlash } from "@/utils/paths";

import RecursiveReveal, { WithContext } from "./RecursiveReveal";

export default function TryItOutComponent() {
  const [prettify, setPrettify] = useState(true);
  const [params, setParams] = useState(JSON.stringify({ test: 123 }, null, 2));
  const [url, setUrl] = useState("/api/lesson");
  const [method, setMethod] = useState("GET");
  const [request, setRequest] = useState({});
  const [output, setOutput] = useState("cooked");

  const onPrettifyChange = useCallback(() => {
    const newPrettify = !prettify;
    setPrettify(newPrettify);

    if (newPrettify) {
      try {
        const prettifiedParams = JSON.stringify(JSON.parse(params), null, 2);

        // Avoid unnecessary re-render.
        if (prettifiedParams === params) {
          return;
        }

        setParams(prettifiedParams);
      } catch {
        // Ignore.
      }
    }
  }, [prettify, params]);

  const onUrlChange = useCallback((evt) => {
    setUrl(evt.target.value);
  }, []);

  const onOutputFormatChange = useCallback((evt) => {
    setOutput(evt.target.value);
  }, []);

  const onMethodChange = useCallback((evt) => {
    setMethod(evt.target.value);
  }, []);

  const onParamsChange = useCallback((evt) => {
    setParams(evt.target.value);
  }, []);

  const onSend = useCallback(
    async (evt) => {
      evt.preventDefault();

      try {
        const parsedParams = JSON.parse(params);

        if (prettify) {
          setParams(JSON.stringify(parsedParams, null, 2));
        }

        try {
          const res = await fetch(`http://localhost:8000${ensureLeadingSlash(url)}`);
          setRequest({
            params: parsedParams,
            url,
            method,
            response: await res.json(),
          });
        } catch {
          // TODO
        }
      } catch {
        // Ignore error.
      }
    },
    [prettify, params, url, method],
  );

  const lines = (params.match(/\n/g) || []).length + 1;

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@500&display=swap"
        />
      </Head>
      <form css={{ display: "flex", flexDirection: "column" }} onSubmit={onSend}>
        <div
          css={{
            border: "none",
            display: "flex",
            justifyContent: "space-between",
            margin: rem(0, 0, 10),
            padding: 0,
          }}
        >
          <select
            id="method"
            css={{
              MozAppearance: "none",
              WebkitAppearance: "none",
              appearance: "none",
              border: `2px solid ${COLOR_GREEN}`,
              borderRadius: rem(4),
              fontFamily: FONT_MONOSPACE,
              fontSize: rem(14),
              outline: "none",
              padding: rem(5, 10),
              width: rem(80),
            }}
            name="method"
            value={method}
            onChange={onMethodChange}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
          <input
            css={{
              border: `2px solid ${COLOR_GREEN}`,
              borderRadius: rem(4),
              fontFamily: FONT_MONOSPACE,
              fontSize: rem(14),
              outline: "none",
              padding: rem(5, 10),
              width: `calc(100% - ${rem(90)})`,
            }}
            onChange={onUrlChange}
            name="url"
            type="text"
            value={url}
          />
        </div>
        <textarea
          css={{
            border: `1px solid ${COLOR_GREEN}`,
            borderRadius: rem(4),
            fontFamily: FONT_MONOSPACE,
            fontSize: rem(12),
            margin: rem(0, 0, 10),
            outline: "none",
            padding: rem(10),
          }}
          name="body"
          data-lines={lines}
          style={{
            height: rem(Math.min(10, lines) * 16 + 20),
          }}
          onChange={onParamsChange}
          value={params}
        />
        <div css={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
          <label
            css={{
              alignItems: "center",
              border: "none",
              display: "flex",
              flexWrap: "nowrap",
              margin: 0,
              padding: 0,
            }}
            htmlFor="prettify"
          >
            <input
              checked={prettify}
              css={{ margin: 0 }}
              id="prettify"
              name="prettify"
              onChange={onPrettifyChange}
              type="checkbox"
            />
            <span css={{ marginLeft: rem(10) }}>Prettify params</span>
          </label>
          <Button type="submit">Send</Button>
        </div>
      </form>
      <WithContext>
        {request.response && (
          <div
            css={{
              border: `2px solid ${COLOR_GREEN}`,
              borderRadius: rem(4),
              fontSize: rem(12),
              marginTop: rem(10),
              padding: rem(5, 10),
            }}
          >
            <label htmlFor="cooked">
              <input
                id="cooked"
                checked={output === "cooked"}
                type="radio"
                name="output"
                onChange={onOutputFormatChange}
                value="cooked"
              />
              <span css={{ fontSize: rem(14), marginLeft: rem(5) }}>Highlighted</span>
            </label>
            <label htmlFor="raw">
              <input
                id="raw"
                checked={output === "raw"}
                type="radio"
                name="output"
                onChange={onOutputFormatChange}
                value="raw"
              />
              <span css={{ fontSize: rem(14), marginLeft: rem(5) }}>Raw</span>
            </label>
          </div>
        )}
        {request.response ? (
          <div
            css={{
              fontFamily: FONT_MONOSPACE,
              border: `1px solid ${COLOR_GREEN}`,
              padding: rem(5, 10),
              marginTop: rem(5),
            }}
          >
            {output === "cooked" ? (
              <div
                css={{
                  fontSize: rem(14),
                  whiteSpace: "nowrap",
                  lineHeight: rem(24),
                  overflow: "auto",
                }}
              >
                <RecursiveReveal value={request.response.data} />
              </div>
            ) : (
              <pre style={{ fontSize: rem(16), wordBreak: "break-all", whiteSpace: "pre-wrap" }}>
                {JSON.stringify(request.response.data)}
              </pre>
            )}
          </div>
        ) : null}
      </WithContext>
    </>
  );
}
