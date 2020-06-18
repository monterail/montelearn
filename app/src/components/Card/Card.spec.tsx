import React from "react";

import { render, cleanup } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  afterEach(() => cleanup);

  describe("className", () => {
    const customClass = "custom-card-class";

    it(`should render with custom class`, async () => {
      const { findByTestId } = render(<Card className={customClass} />);
      const card = await findByTestId("card");

      expect(card).toBeInTheDocument();
      expect(card).toHaveClass(customClass);
    });
  });

  describe("children", () => {
    const customText = "Custom text tips fedora";
    it(`should render with child text`, () => {
      const { queryByText } = render(<Card>{customText}</Card>);
      const foundChildElement = queryByText(customText);

      expect(foundChildElement).toBeInTheDocument();
    });

    it(`should render with child element`, () => {
      const childTestId = "cardChildElement";
      const childElement = <p data-testid={childTestId}>{customText}</p>;
      const { queryByTestId } = render(<Card>{childElement}</Card>);
      const foundChildElement = queryByTestId(childTestId);

      expect(foundChildElement).toBeInTheDocument();
    });
  });
});
