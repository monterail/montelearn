import React from "react";
import { render, cleanup } from "@testing-library/react";

import InputErrors from "./InputErrors";

describe("InputErrors", () => {
  afterEach(() => cleanup);

  describe("if errors are empty", () => {
    it("is empty", async () => {
      const { findByTestId } = render(<InputErrors errors={[]} />);
      expect(await findByTestId("input-errors")).toBeEmpty();
    });
  });

  describe("if errors contains elements", () => {
    const errors = ["First error", "Second error"];
    it("errors should be in the document", async () => {
      const { findByTestId } = render(<InputErrors errors={errors} />);
      for (const [idx, error] of errors.entries()) {
        const errorElement = await findByTestId(`error-${idx}`);
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toHaveTextContent(error);
      }
    });
  });
});
