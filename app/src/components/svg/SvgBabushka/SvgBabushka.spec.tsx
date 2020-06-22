import React from "react";
import { render, cleanup } from "@testing-library/react";

import SvgBabushka from "./SvgBabushka";

describe("SvgBabushka", () => {
  afterEach(() => cleanup);

  it("is in document", async () => {
    const { findByTestId } = render(<SvgBabushka />);

    expect(await findByTestId("svg-babushka")).toBeInTheDocument();
  });
});
