import { render } from "@testing-library/react";

import Text from "./Text";

describe("Text", () => {
  describe("className", () => {
    const customClass = "custom-class";

    it("should render without custom class", async () => {
      const { findByTestId } = render(<Text />);
      const text = await findByTestId("text-spec");

      expect(text).toBeInTheDocument();
      expect(text).not.toHaveClass(customClass);
    });

    it("should render with custom class", async () => {
      const { findByTestId } = render(<Text className={customClass} />);
      const text = await findByTestId("text-spec");

      expect(text).toBeInTheDocument();
      expect(text).toHaveClass(customClass);
    });
  });
  describe("children", () => {
    const customText = "Custom text";
    it("should render with custom child text", () => {
      const { queryByText } = render(<Text>{customText}</Text>);
      const foundChildElement = queryByText(customText);

      expect(foundChildElement).toBeInTheDocument();
    });

    it("should render with custom child element", () => {
      const childTestId = "text-child-element";
      const childElement = <span data-testid={childTestId}>{customText}</span>;
      const { queryByTestId } = render(<Text>{childElement}</Text>);
      const foundChildElement = queryByTestId(childTestId);

      expect(foundChildElement).toBeInTheDocument();
    });
  });
});
