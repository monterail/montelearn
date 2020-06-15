import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BUTTON_DIRECTIONS } from "@/constants/buttonDirecitons";

import LinkWithArrow from "./LinkWithArrow";

describe("LinkWithArrow", () => {
  afterEach(() => cleanup);

  describe("props", () => {
    const href = "test-link";
    const direction = BUTTON_DIRECTIONS.LEFT;

    const { findByRole } = render(<LinkWithArrow href={href} direction={direction} />);

    it("renders href correctly", async () => {
      expect(await findByRole("link")).toHaveProperty("href", window.location.href + href);
    });
  });
});
