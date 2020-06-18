import React from "react";
import { render, cleanup } from "@testing-library/react";

import Textarea from "./Textarea";

describe("Textarea", () => {
  afterEach(() => cleanup);

  describe("props", () => {
    const value = "test value";
    const label = "test label";

    const setupTextarea = () => {
      const utils = render(<Textarea value={value} label={label} />);
      const textarea = utils.getByTestId("textarea");
      return {
        textarea,
        ...utils,
      };
    };

    it("has correct value prop", async () => {
      const { findByText } = setupTextarea();

      expect(await findByText(value)).toBeInTheDocument();
      expect(await findByText(value)).toHaveTextContent(value);
    });

    it("has correct label prop", async () => {
      const { findByText } = setupTextarea();

      expect(await findByText(label)).toBeInTheDocument();
      expect(await findByText(label)).toHaveTextContent(label);
    });
  });
});
