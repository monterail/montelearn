import React from "react";
import { render, cleanup } from "@testing-library/react";

import Footer from "./Footer";

describe("Footer", () => {
  afterEach(() => cleanup());

  it("renders correct message", () => {
    const { getByText } = render(<Footer />);
    const element = getByText((_, node) => {
      const hasText = (nestedNode) => nestedNode.textContent === "Developed with ❤️ by Monterail";
      const nodeHasText = hasText(node);

      const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child));

      return nodeHasText && childrenDontHaveText;
    });
    expect(element).toBeInTheDocument();
  });
});
