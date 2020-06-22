import React from "react";
import { render, cleanup } from "@testing-library/react";

import SvgArrowRight from "./SvgArrowRight";

describe("SvgArrowRight", () => {
  afterEach(() => cleanup);

  it("is in document", async () => {
    const { findByTestId } = render(<SvgArrowRight />);

    expect(await findByTestId("svg-arrow-right")).toBeInTheDocument();
  });
});
