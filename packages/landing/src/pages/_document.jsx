import Document, { Html, Head, Main, NextScript } from 'next/document'

import { FONT_SANS_SERIF } from '../theming/const'
import { rem } from '../theming/utils'

export default class NextDocument extends Document {
  static getInitialProps = Document.getInitialProps;

  render() {
    return (
      <Html>
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
          <link href="https://fonts.googleapis.com/css?family=Playfair+Display:700|Roboto:400&display=swap&subset=latin-ext" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
