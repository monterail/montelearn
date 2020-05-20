import { render } from "@testing-library/react";

import Component from "..";

describe("Home", () => {
  it("should render without errors", () => {
    expect(() => render(<Component />)).not.toThrow();
  });
});
