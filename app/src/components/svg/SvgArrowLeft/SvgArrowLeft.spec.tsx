import React from "react";
import { render, cleanup } from "@testing-library/react";

import SvgArrowLeft from "./SvgArrowLeft";

describe("SvgArrowLeft", () => {
  afterEach(() => cleanup);

  it("is in document", async () => {
    const { findByTestId } = render(<SvgArrowLeft />);

    expect(await findByTestId("svg-arrow-left")).toBeInTheDocument();
  });
});
