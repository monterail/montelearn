import { css, Global } from "@emotion/core";
import Document, { Html, Head, Main, NextScript } from "next/document";

import { FONT_SANS_SERIF } from "@project/core/lib/const/theming";

export default class NextDocument extends Document {
  static getInitialProps = Document.getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head>
          <Global
            styles={css`
              body {
                -webkit-font-smoothing: antialiased;
                font-family: ${FONT_SANS_SERIF};
                margin: 0;
              }

              body,
              #__next {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
              }

              *,
              *:before,
              *:after {
                box-sizing: border-box;
              }
            `}
          />
          <link rel="preconnect" href="//fonts.gstatic.com" />
          <link rel="preconnect" href="//fonts.googleapis.com" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                var proto = window.location.protocol;
                var l = document.createElement('link');
                l.rel = 'stylesheet';
                l.href = proto + '//fonts.googleapis.com/css?family=Playfair+Display:700|Roboto:400&display=swap';
                document.head.append(l);
              `,
            }}
          />
        </body>
      </Html>
    );
  }
}
