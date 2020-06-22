import React from "react";
import { render, cleanup } from "@testing-library/react";

import SvgNature from "./SvgNature";

describe("SvgNature", () => {
  afterEach(() => cleanup);

  it("is in document", async () => {
    const { findByTestId } = render(<SvgNature />);

    expect(await findByTestId("svg-nature")).toBeInTheDocument();
  });
});
