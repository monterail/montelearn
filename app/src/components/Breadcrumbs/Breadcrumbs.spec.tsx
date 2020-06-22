import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Breadcrumbs from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  afterEach(() => cleanup);

  describe("options", () => {
    it("renders correct options", async () => {
      const { findAllByTestId } = render(<Breadcrumbs options={["David", "Bowie"]} />);
      expect(await findAllByTestId("element")).toHaveLength(2);
    });
  });

  describe("handleBackClick", () => {
    it("calls backClick function", () => {
      const backClickMock = jest.fn();
      const { getByRole } = render(
        <Breadcrumbs options={["One"]} handleBackClick={backClickMock} />,
      );
      fireEvent.click(getByRole("button"));
      expect(backClickMock).toHaveBeenCalled();
    });
  });
});
