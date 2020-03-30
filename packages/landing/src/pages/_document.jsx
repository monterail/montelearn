import Document, { Html, Head, Main, NextScript } from 'next/document'

import { FONT_SANS_SERIF } from '../theming/const'
import { rem } from '../theming/utils'

export default class NextDocument extends Document {
  static getInitialProps = Document.getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            dangerouslySetInnerHTML={{ __html: `
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
            ` }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script type="text/javascript"
          dangerouslySetInnerHTML={{ __html: `
            WebFontConfig = {
              google: {
                families: [ 'Playfair+Display:700', 'Roboto:400' ]
              }
            };
            (function() {
              var wf = document.createElement('script');
              wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
              wf.type = 'text/javascript';
              wf.async = 'true';
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(wf, s);
            })();
          `}}
          />
        </body>
      </Html>
    )
  }
}
