import React from "react";
import { render, cleanup } from "@testing-library/react";

import SvgCastle from "./SvgCastle";

describe("SvgCastle", () => {
  afterEach(() => cleanup);

  it("is in document", async () => {
    const { findByTestId } = render(<SvgCastle />);

    expect(await findByTestId("svg-castle")).toBeInTheDocument();
  });
});
