import React from "react";
import { FONT_SANS_SERIF, COLOR_WHITE, COLOR_BLACK } from "@/theming/const";
import { rem } from "@/theming/utils";
import StyledButton from "../StyledButton/StyledButton";

const Card = ({ title, content }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <StyledButton
        css={{
          backgroundColor: COLOR_WHITE,
          color: COLOR_BLACK,
          height: rem(48),
          border: `2px solid ${COLOR_BLACK}`,
          padding: rem(15, 30),
        }}
      >
        Try it out
      </StyledButton>
    </Container>
  );
};

export function Container({ style = {}, ...props }) {
  return (
    <div
      css={{
        width: "420px",
        padding: "40px",

        background: COLOR_WHITE,
        boxShadow: `0px 1.59602px 5.18708px rgba(0, 0, 0, 0.0161557),
          0px 5.36071px 17.4223px rgba(0, 0, 0, 0.0238443),
          0px 24px 78px rgba(0, 0, 0, 0.04)`,
        borderRadius: "8px",
        ...style,
      }}
      {...props}
    />
  );
}

export function Title({ ...props }) {
  return (
    <div
      css={{
        fontFamily: FONT_SANS_SERIF,
        fontWeight: "bold",
        fontSize: "36px",
      }}
      {...props}
    />
  );
}

export function Content({ ...props }) {
  return (
    <div
      css={{
        fontFamily: FONT_SANS_SERIF,
        fontWeight: "normal",
        fontSize: rem(18),
        lineHeight: "170%",
        margin: rem(20, 0),
      }}
      {...props}
    />
  );
}

export default Card;
