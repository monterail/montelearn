import React from "react";
import { render, cleanup } from "@testing-library/react";

import SvgWeather from "./SvgWeather";

describe("SvgWeather", () => {
  afterEach(() => cleanup);

  it("is in document", async () => {
    const { findByTestId } = render(<SvgWeather />);

    expect(await findByTestId("svg-weather")).toBeInTheDocument();
  });
});
