import React from "react";
import { render } from "@testing-library/react";

import Label from "./Label";

describe("Label", () => {
  it("renders correctly", async () => {
    const { findByText } = render(<Label className="testClass">Sample</Label>);
    const wrapper = await findByText("Sample");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass("testClass");
  });
});
