import Document, { Html, Head, Main, NextScript } from "next/document";

import { FONT_SANS_SERIF } from "../theming/const";

export default class NextDocument extends Document {
  static getInitialProps = Document.getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            dangerouslySetInnerHTML={{
              __html: `
              body {
                font-family: ${FONT_SANS_SERIF}; margin: 0;
                -webkit-font-smoothing: antialiased;
              }

              body, #__next {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
              }

              *, *:before, *:after {
                box-sizing: border-box;
              }
            `,
            }}
          />
          <link rel="preconnect" href="googleapis.com" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                var l = document.createElement('link');
                l.rel = 'stylesheet';
                l.href = 'http://fonts.googleapis.com/css?family=Playfair+Display:700|Roboto:400&display=swap';
                document.head.append(l);
              `,
            }}
          />
        </body>
      </Html>
    );
  }
}
