import React from "react";
import { render, cleanup } from "@testing-library/react";

import SvgLogo from "./SvgLogo";

describe("SvgLogo", () => {
  afterEach(() => cleanup);

  it("is in document", async () => {
    const { findByTestId } = render(<SvgLogo />);

    expect(await findByTestId("svg-logo")).toBeInTheDocument();
  });
});
