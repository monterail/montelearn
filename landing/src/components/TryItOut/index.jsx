import fetch from "isomorphic-unfetch";
import Head from "next/head";
import { useCallback, useState } from "react";

import { FONT_MONOSPACE, COLOR_GREEN, COLOR_WHITE, FONT_SANS_SERIF } from "@/theming/const";
import { rem } from "@/theming/utils";
import { ensureLeadingSlash } from "@/utils/paths";

import RecursiveReveal, { WithContext } from "./RecursiveReveal";

const predefinedAPIs = {
  lessonsApi: { method: "GET", url: "/api/lesson" },
};

export default function TryItOutComponent() {
  const [params, setParams] = useState(JSON.stringify({ id: 1 }, null, 2));
  const [request, setRequest] = useState({});
  const [apiConfig, setApiConfig] = useState("lessonsApi");

  const onChangeApi = useCallback((evt) => {
    setApiConfig(evt.target.value);
    setRequest({});
  }, []);

  const onParamsChange = useCallback((evt) => {
    setParams(evt.target.value);
  }, []);

  const onSend = useCallback(
    async (evt) => {
      evt.preventDefault();

      try {
        const { url, method } = predefinedAPIs[apiConfig];
        const parsedParams = JSON.parse(params);

        setParams(JSON.stringify(parsedParams, null, 2));

        const res = await fetch(`http://localhost:8000${ensureLeadingSlash(url)}`, {
          method,
          data: params,
        });

        setRequest({
          params: parsedParams,
          url,
          method,
          response: {
            body: res.ok ? (await res.json()).data : null,
            headers: Array.from(res.headers.entries()),
            ok: res.ok,
            status: res.status,
            statusText: res.statusText,
          },
        });
      } catch {
        // Ignore error.
      }
    },
    [params, apiConfig],
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
            alignItems: "stretch",
            backgroundColor: COLOR_WHITE,
            border: `1px solid ${COLOR_GREEN}`,
            borderBottom: "none",
            borderRadius: rem(4, 4, 0, 0),
            display: "flex",
            justifyContent: "space-between",
            padding: 0,
          }}
        >
          <select
            css={{
              MozAppearance: "none",
              WebkitAppearance: "none",
              appearance: "none",
              backgroundColor: "transparent",
              border: "none",
              fontFamily: FONT_MONOSPACE,
              fontSize: rem(14),
              outline: "none",
              padding: rem(5, 10),
              width: `calc(100% - ${rem(100)})`,
            }}
            name="apiConfig"
            value={apiConfig}
            onChange={onChangeApi}
          >
            {Object.keys(predefinedAPIs).map((k) => (
              <option value={k}>
                {predefinedAPIs[k].method} {predefinedAPIs[k].url}
              </option>
            ))}
          </select>
          <button
            css={{
              MozAppearance: "none",
              WebkitAppearance: "none",
              appearance: "none",
              backgroundColor: COLOR_GREEN,
              border: "none",
              borderRadius: rem(4),
              color: COLOR_WHITE,
              cursor: "pointer",
              fontFamily: FONT_SANS_SERIF,
              fontSize: rem(14),
              fontWeight: 700,
              height: rem(32),
              margin: rem(5),
              padding: 0,
              width: rem(80),
            }}
            type="submit"
          >
            Send
          </button>
        </div>
        <textarea
          css={{
            border: `1px solid ${COLOR_GREEN}`,
            borderRadius: rem(0, 0, 4, 4),
            fontFamily: FONT_MONOSPACE,
            fontSize: rem(12),
            margin: rem(0, 0, 10),
            outline: "none",
            padding: rem(10),
          }}
          name="body"
          data-lines={lines}
          style={{
            height: rem(Math.min(10, lines) * 16 + 25),
          }}
          onChange={onParamsChange}
          value={params}
        />
      </form>
      <WithContext>
        {request.response &&
          (request.response.ok ? (
            <div
              css={{
                backgroundColor: COLOR_WHITE,
                border: `1px solid ${COLOR_GREEN}`,
                borderRadius: rem(4),
                fontFamily: FONT_MONOSPACE,
                fontSize: rem(14),
                lineHeight: rem(24),
                marginTop: rem(10),
                overflow: "auto",
                padding: rem(5, 10),
                whiteSpace: "nowrap",
              }}
            >
              <RecursiveReveal id="root" value={request.response.body} />
            </div>
          ) : (
            <div>
              {request.response.status} {request.response.statusText}
            </div>
          ))}
      </WithContext>
    </>
  );
}
