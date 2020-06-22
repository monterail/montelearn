import React from "react";
import { render, cleanup } from "@testing-library/react";

import SvgAtom from "./SvgAtom";

describe("SvgAtom", () => {
  afterEach(() => cleanup);

  it("is in document", async () => {
    const { findByTestId } = render(<SvgAtom />);

    expect(await findByTestId("svg-atom")).toBeInTheDocument();
  });
});
