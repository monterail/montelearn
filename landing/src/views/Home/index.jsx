import Head from "next/head";

import Button from "@/components/Button";
import ContentWidth from "@/components/ContentWidth";
import TryItOut from "@/components/TryItOut";
import {
  COLOR_GREEN,
  COLOR_WHITE,
  FONT_SERIF,
  COLOR_MILANO_RED,
  COLOR_DON_JUAN,
  COLOR_GEYSER,
} from "@/theming/const";
import { rem } from "@/theming/utils";

const EDITOR_ID = "try-it-out";

function scrollToEditor() {
  const editorElement = document.getElementById(EDITOR_ID);

  if (!editorElement) {
    return;
  }

  editorElement.scrollIntoView({ behavior: "smooth" });
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
              Build your own learning experience
            </h1>
            <p css={{ maxWidth: rem(512), margin: rem(30, 0), fontSize: rem(18), lineHeight: 1.4 }}>
              We provide a rich API for developers who can build custom learning software for
              students on every education level
            </p>
            <Button onClick={scrollToEditor} palette="white" size="large" type="button">
              Try it out!
            </Button>
          </ContentWidth>
        </section>
      </div>
      <main css={{ flexGrow: 1 }}>
        <section css={{ backgroundColor: COLOR_GEYSER, padding: rem(40, 0) }}>
          <ContentWidth css={{ padding: rem(0, 20) }}>
            <h2 css={{ fontFamily: FONT_SERIF, fontSize: rem(32), margin: 0 }}>Try it out now!</h2>
            <p css={{ color: COLOR_DON_JUAN, fontSize: rem(18), margin: rem(20, 0) }}>
              We know how reading documentation can be a hassle.
              <br />
              That's why we created a simple section where you can play with data provided by our
              services. Have fun!
            </p>
            <div
              id={EDITOR_ID}
              css={{ margin: "0 auto", minHeight: rem(100), maxWidth: "100%", width: rem(475) }}
            >
              <TryItOut />
            </div>
          </ContentWidth>
        </section>
      </main>
      <footer css={{ backgroundColor: COLOR_WHITE, color: COLOR_DON_JUAN, padding: rem(20) }}>
        <ContentWidth css={{ fontSize: rem(14), textAlign: "right" }}>
          Developed with <span css={{ color: COLOR_MILANO_RED }}>&#9829;</span> by Monterail
        </ContentWidth>
      </footer>
    </>
  );
}
