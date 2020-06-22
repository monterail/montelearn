import React from "react";
import { render, cleanup } from "@testing-library/react";

import SvgCheckmark from "./SvgCheckmark";

describe("SvgCheckmark", () => {
  afterEach(() => cleanup);

  it("is in document", async () => {
    const { findByTestId } = render(<SvgCheckmark />);

    expect(await findByTestId("svg-checkmark")).toBeInTheDocument();
  });
});
