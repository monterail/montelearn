import React from "react";
import Card from "./Card";
import StyledFlexContainer from "../Container/StyledFlexContainer";

const cards = [
  {
    title: "Students",
    content:
      "React JS leverages virtual DOMs (Document Object Models) to increase its performance speed. Instead of writing data to a physical drive, it uses computer memory for smoother operation.",
  },
  {
    title: "Teachers",
    content:
      "React JS leverages virtual DOMs (Document Object Models) to increase its performance speed. Instead of writing data to a physical drive, it uses computer memory for smoother operation.",
  },
  {
    title: "Developers",
    content:
      "React JS leverages virtual DOMs (Document Object Models) to increase its performance speed. Instead of writing data to a physical drive, it uses computer memory for smoother operation.",
  },
];

const Content = () => {
  return (
    <StyledFlexContainer css={{ justifyContent: "space-between" }}>
      {cards.map((el) => {
        return <Card key={el.title} title={el.title} content={el.content} />;
      })}
    </StyledFlexContainer>
  );
};

export default Content;
