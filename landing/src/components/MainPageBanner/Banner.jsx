import React from "react";
import {
  COLOR_PINK,
  FONT_ECZAR,
  FONT_SANS_SERIF_MONO,
  COLOR_RED,
  COLOR_WHITE,
} from "@/theming/const";
import { rem } from "@/theming/utils";
import StyledButton from "../StyledButton/StyledButton";

const Banner = () => {
  return (
    <Section>
      <Box>
        <Title>
          Build your own
          <br /> learning experience
        </Title>
        <Content>
          We provide a rich API for developers who
          <br /> can build custom learning software for
          <br /> students on every education level
        </Content>
        <img
          alt="main"
          css={{
            flexShrink: 0,
            position: "absolute",
            right: "0",
            top: "300px",
          }}
          src="/images/main-image.svg"
        />
        <StyledButton
          css={{
            backgroundColor: COLOR_RED,
            color: COLOR_WHITE,
            height: rem(60),
            padding: rem(20, 40),
          }}
        >
          Try it out
        </StyledButton>
      </Box>
    </Section>
  );
};

export function Section({ style = {}, ...props }) {
  return (
    <div
      css={{
        backgroundColor: COLOR_PINK,
        height: "800px",
        marginBottom: "40px",
        ...style,
      }}
      {...props}
    />
  );
}

export function Box({ style = {}, ...props }) {
  return (
    <div
      css={{
        paddingTop: "80px",
        paddingLeft: "80px",
        position: "relative",
        ...style,
      }}
      {...props}
    />
  );
}

export function Title({ style = {}, ...props }) {
  return (
    <div
      css={{
        fontFamily: FONT_ECZAR,
        fontSize: "80px",
        lineHeight: "100%",
        ...style,
      }}
      {...props}
    />
  );
}

export function Content({ style = {}, ...props }) {
  return (
    <div
      css={{
        fontFamily: FONT_SANS_SERIF_MONO,
        fontSize: "22px",
        lineHeight: "170%",
        margin: rem(40, 0),
        ...style,
      }}
      {...props}
    />
  );
}

export default Banner;
