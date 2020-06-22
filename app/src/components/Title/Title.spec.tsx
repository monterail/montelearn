import { render } from "@testing-library/react";

import Title from "./Title";

describe("Title", () => {
  describe("className", () => {
    const customClass = "custom-class";

    it("should render without custom class", async () => {
      const { findByTestId } = render(<Title />);
      const title = await findByTestId("title-spec");

      expect(title).toBeInTheDocument();
      expect(title).not.toHaveClass(customClass);
    });

    it("should render with custom class", async () => {
      const { findByTestId } = render(<Title className={customClass} />);
      const title = await findByTestId("title-spec");

      expect(title).toBeInTheDocument();
      expect(title).toHaveClass(customClass);
    });
  });
  describe("children", () => {
    const customTitle = "Custom title";
    it("should render with custom child text", () => {
      const { queryByText } = render(<Title>{customTitle}</Title>);
      const foundChildElement = queryByText(customTitle);

      expect(foundChildElement).toBeInTheDocument();
    });

    it("should render with custom child element", () => {
      const childTestId = "title-child-element";
      const childElement = <p data-testid={childTestId}>{customTitle}</p>;
      const { queryByTestId } = render(<Title>{childElement}</Title>);
      const foundChildElement = queryByTestId(childTestId);

      expect(foundChildElement).toBeInTheDocument();
    });
  });
});
