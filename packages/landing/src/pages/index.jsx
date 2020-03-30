import Head from "next/head"

import ContentWidth from '../components/ContentWidth';

import { COLOR_GREEN, COLOR_WHITE, FONT_SERIF } from '../theming/const';
import { rem } from '../theming/utils';

const EDITOR_ID = 'try-it-out';

function scrollToEditor() {
  document.getElementById(EDITOR_ID).scrollIntoView({
    behavior: 'smooth',
  });
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Monterail e-learning</title>
      </Head>
      <section style={{
        backgroundColor: COLOR_GREEN,
      }}>
        <section style={{
          color: COLOR_WHITE,
          margin: rem(0, 20),
        }}>
          <ContentWidth style={{
            borderBottom: '1px solid ' + COLOR_WHITE,
            padding: rem(15, 0),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }}>
            <img height="27" width="132" style={{ flexShrink: 0 }} src="/images/logo.svg" />
            <button style={{
              MozAppearance: 'none', WebkitAppearance: 'none', backgroundColor: 'transparent',
              fontFamily: 'inherit', color: COLOR_WHITE, fontSize: rem(14),
              border: '1px solid ' + COLOR_WHITE, borderRadius: '32px', margin: 0,
              minHeight: rem(32),
              padding: rem(0, 15),
              flexShrink: 0,
            }} onClick={scrollToEditor}>
              Try it out!
            </button>
          </ContentWidth>
        </section>
        <section style={{
          minHeight: '60vh' ,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <ContentWidth style={{ padding: rem(20) }}>
            <h1 style={{ margin: rem(30, 0), fontFamily: FONT_SERIF, fontSize: rem(36) }}>Build your own learning experience</h1>
            <p style={{ margin: rem(30, 0), fontSize: rem(18), lineHeight: 1.4 }}>We provide a rich API for developers who can build custom learning software for students on every education level</p>
          </ContentWidth>
        </section>
      </section>
      <ContentWidth as="main" style={{ flexGrow: 1, padding: rem(20) }}>
        <section id={EDITOR_ID} style={{
          width: '100%', maxWidth: rem(425), padding: rem(20),
          border: '1px solid #ccc',
          borderRadius: '5px',
          marginLeft: 'auto',
          marginRight: 'auto',

        }}>
          Here we will place a <u>try it out</u> component!
        </section>
      </ContentWidth>
      <footer style={{ backgroundColor: '#dde3e4', color: '#584e56', padding: rem(20) }}>
        <ContentWidth style={{ fontSize: rem(14), textAlign: 'right' }}>
          Developed with <span style={{ color: '#b70505' }}>&#9829;</span> by Monterail
        </ContentWidth>
      </footer>
    </>
  );
}
