import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  afterEach(() => cleanup);

  describe("className", () => {
    const customClass = "custom-class";
    it("should render Title with custom class", () => {
      const { getByRole } = render(<Button className={customClass} />);
      expect(getByRole("button")).toHaveClass(customClass);
    });
  });

  describe("onClick", () => {
    const mockOnClick = jest.fn();
    it("should call mock function when button is clicked", () => {
      const { getByRole } = render(<Button onClick={mockOnClick} />);
      fireEvent.click(getByRole("button"));
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  describe("children", () => {
    const buttonText = "Button text";
    it("should render Button with custom text", () => {
      const { getByRole } = render(<Button>{buttonText}</Button>);
      expect(getByRole("button")).toHaveTextContent(buttonText);
    });
  });
});
