import React from "react";
import { render, cleanup } from "@testing-library/react";

import SvgPotion from "./SvgPotion";

describe("SvgPotion", () => {
  afterEach(() => cleanup);

  it("is in document", async () => {
    const { findByTestId } = render(<SvgPotion />);

    expect(await findByTestId("svg-potion")).toBeInTheDocument();
  });
});
