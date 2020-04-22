import Head from "next/head";
import { useCallback, useState } from "react";

import {
  COLOR_GREEN,
  COLOR_MILANO_RED,
  COLOR_WHITE,
  FONT_MONOSPACE,
  FONT_SANS_SERIF,
} from "@/theming/const";
import { rem } from "@/theming/utils";
import { getLinesCount } from "@/utils/words";

import sendRequest from "./api";
import RecursiveReveal from "./RecursiveReveal";

export default function TryItOut({ endpoints }) {
  const [endpointIndex, setEndpointIndex] = useState(0);
  const [params, setParams] = useState(JSON.stringify({}, null, 2));
  const [request, setRequest] = useState({});

  const onChangeEndpoint = useCallback(
    (evt) => {
      setEndpointIndex(parseInt(evt.target.value, 10));
      setRequest({});
    },
    [setEndpointIndex, setRequest],
  );

  const onParamsChange = useCallback(
    (evt) => {
      setParams(evt.target.value);
    },
    [setParams],
  );

  const onSend = useCallback(
    async (evt) => {
      evt.preventDefault();

      try {
        const { url, method } = endpoints[endpointIndex];
        const body = JSON.parse(params);

        setParams(JSON.stringify(body, null, 2));

        const response = await sendRequest(method, url, body);

        setRequest({
          response,
          request: { body, method, url },
        });
      } catch {
        // Ignore JSON parsing error.
      }
    },
    [params, endpoints, endpointIndex],
  );

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@500&display=swap"
        />
      </Head>
      <form
        data-testid="TryItOut_Form"
        css={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSend}
      >
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
            data-testid="TryItOut_EndpointSelect"
            name="endpoint"
            onChange={onChangeEndpoint}
            value={endpointIndex}
          >
            {endpoints.map(({ displayText, url }, index) => (
              <option key={url} value={index}>
                {displayText}
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
            data-testid="TryItOut_SubmitButton"
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
            height: rem(Math.min(10, getLinesCount(params)) * 16 + 25),
            margin: rem(0, 0, 10),
            outline: "none",
            padding: rem(10),
          }}
          data-testid="TryItOut_ParamsInput"
          name="body"
          onChange={onParamsChange}
          value={params}
        />
      </form>
      {request.response && (
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
          {request.response.ok ? (
            <RecursiveReveal id="root" value={request.response.body} />
          ) : (
            <span css={{ color: COLOR_MILANO_RED }}>
              {request.response.status} {request.response.statusText}
            </span>
          )}
        </div>
      )}
    </>
  );
}
