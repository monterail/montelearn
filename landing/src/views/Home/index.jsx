import Head from "next/head";

import ContentWidth from "@/components/ContentWidth";
import {
  COLOR_GREEN,
  COLOR_WHITE,
  FONT_SERIF,
  COLOR_MILANO_RED,
  COLOR_DON_JUAN,
  COLOR_GEYSER,
} from "@/theming/const";
import { rem } from "@/theming/utils";

import CallToAction from "./CallToAction";

const EDITOR_ID = "try-it-out";

function scrollToEditor() {
  document.getElementById(EDITOR_ID).scrollIntoView({
    behavior: "smooth",
  });
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Monterail e-learning</title>
        <meta name="description" content="REST API for building custom e-learning software" />
      </Head>
      <div css={{ backgroundColor: COLOR_GREEN }}>
        <section css={{ color: COLOR_WHITE, margin: rem(0, 20) }}>
          <ContentWidth
            css={{
              alignItems: "center",
              borderBottom: `1px solid ${COLOR_WHITE}`,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              padding: rem(15, 0),
            }}
          >
            <img css={{ flexShrink: 0 }} alt="Logo" height="27" src="/images/logo.svg" />
          </ContentWidth>
        </section>
        <section
          css={{
            minHeight: "60vh",
            color: COLOR_WHITE,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <ContentWidth css={{ padding: rem(20) }}>
            <h1 css={{ margin: rem(30, 0), fontFamily: FONT_SERIF, fontSize: rem(36) }}>
              Witam! Build your own learning experience
            </h1>
            <p css={{ maxWidth: rem(512), margin: rem(30, 0), fontSize: rem(18), lineHeight: 1.4 }}>
              We provide a rich API for developers who can build custom learning software for
              students on every education level
            </p>
            <CallToAction onClick={scrollToEditor} />
          </ContentWidth>
        </section>
      </div>
      <ContentWidth as="main" css={{ flexGrow: 1, padding: rem(20) }}>
        <section
          css={{
            width: "100%",
            maxWidth: rem(425),
            padding: rem(20),
            border: `1px solid ${COLOR_GEYSER}`,
            borderRadius: "5px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          id={EDITOR_ID}
        >
          Here we will place a <u>try it out</u> component!
        </section>
      </ContentWidth>
      <footer css={{ backgroundColor: COLOR_GEYSER, color: COLOR_DON_JUAN, padding: rem(20) }}>
        <ContentWidth css={{ fontSize: rem(14), textAlign: "right" }}>
          Developed with <span css={{ color: COLOR_MILANO_RED }}>&#9829;</span> by Monterail
        </ContentWidth>
      </footer>
    </>
  );
}
