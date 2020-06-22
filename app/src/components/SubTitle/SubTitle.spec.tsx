import { render } from "@testing-library/react";

import SubTitle from "./SubTitle";

describe("SubTitle", () => {
  describe("className", () => {
    const customClass = "custom-class";

    it("should render without custom class", async () => {
      const { findByTestId } = render(<SubTitle />);
      const subtitle = await findByTestId("subtitle-spec");

      expect(subtitle).toBeInTheDocument();
      expect(subtitle).not.toHaveClass(customClass);
    });

    it("should render with custom class", async () => {
      const { findByTestId } = render(<SubTitle className={customClass} />);
      const subtitle = await findByTestId("subtitle-spec");

      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveClass(customClass);
    });
  });
  describe("children", () => {
    const customSubtitle = "Custom subtitle";
    it("should render with custom child text", () => {
      const { queryByText } = render(<SubTitle>{customSubtitle}</SubTitle>);
      const foundChildElement = queryByText(customSubtitle);

      expect(foundChildElement).toBeInTheDocument();
    });

    it("should render with custom child element", () => {
      const childTestId = "subtitle-child-element";
      const childElement = <p data-testid={childTestId}>{customSubtitle}</p>;
      const { queryByTestId } = render(<SubTitle>{childElement}</SubTitle>);
      const foundChildElement = queryByTestId(childTestId);

      expect(foundChildElement).toBeInTheDocument();
    });
  });
});
