import React from "react";
import { render, cleanup } from "@testing-library/react";
import { BUTTON_DIRECTIONS } from "@/constants/buttonDirecitons";

import LinkWithArrow from "./LinkWithArrow";

describe("LinkWithArrow", () => {
  afterEach(() => cleanup);

  describe("props", () => {
    const href = "test-link";
    const direction = BUTTON_DIRECTIONS.LEFT;
    const className = "test class";

    it("renders href correctly", async () => {
      const { findByRole } = render(<LinkWithArrow href={href} direction={direction} />);
      expect(await findByRole("link")).toHaveProperty("href", window.location.href + href);
    });

    it("renders the arrow accordingly to direction", async () => {
      const { findByTestId } = render(<LinkWithArrow href={href} direction={direction} />);
      expect(await findByTestId("svg-arrow-left")).toBeInTheDocument();
    });

    it("passes classes correctly", async () => {
      const { findByRole } = render(
        <LinkWithArrow href={href} direction={direction} className={className} />,
      );
      expect(await findByRole("link")).toHaveClass(className);
    });

    it("does not render border when implied", async () => {
      const { findByRole } = render(
        <LinkWithArrow href={href} direction={direction} withBorder={false} />,
      );
      expect(await findByRole("link")).toHaveClass(
        "pr-2 pl-4 sm:px-4 border-0 sm:border-2 border-black",
      );
    });
  });
});
