import Head from "next/head";
import { useCallback, useState } from "react";

import Button from "@/components/Button";
import { FONT_MONOSPACE, COLOR_GREEN } from "@/theming/const";
import { rem } from "@/theming/utils";

export default function TryItOutComponent() {
  const [prettify, setPrettify] = useState(true);
  const [params, setParams] = useState(JSON.stringify({ test: 123 }, null, 2));
  const [url, setUrl] = useState("/api/lessons");
  const [method, setMethod] = useState("GET");
  const [request, setRequest] = useState({});

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

        setRequest({
          params: parsedParams,
          url,
          method,
        });

        const r = await fetch(`https://lesson-api-test.herokuapp.com${url}`);
        setRequest({
          params: parsedParams,
          url,
          method,
          response: r,
        });
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
              css={{ margin: 0 }}
              checked={prettify}
              onChange={onPrettifyChange}
              type="checkbox"
              name="prettify"
              id="prettify"
            />
            <span css={{ marginLeft: rem(10) }}>Prettify</span>
          </label>
          <Button type="submit">Send</Button>
        </div>
      </form>
      <pre style={{ border: "1px solid #ccc", padding: rem(5, 10) }}>
        {JSON.stringify(request.response, null, 2)}
      </pre>
    </>
  );
}
