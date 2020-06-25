import { render, fireEvent, cleanup } from "@testing-library/react";

import { BUTTON_DIRECTIONS } from "@/constants/buttonDirecitons";
import ButtonWithArrow from "./ButtonWithArrow";

describe("ButtonWithArrow", () => {
  afterEach(() => cleanup);

  describe("direction", () => {
    it("should render with SvgArrowLeft", () => {
      const { getByTestId } = render(<ButtonWithArrow direction={BUTTON_DIRECTIONS.LEFT} />);
      expect(getByTestId("svg-arrow-left")).toBeInTheDocument();
    });
    it("should render with SvgArrowRight", () => {
      const { getByTestId } = render(<ButtonWithArrow direction={BUTTON_DIRECTIONS.RIGHT} />);
      expect(getByTestId("svg-arrow-right")).toBeInTheDocument();
    });
  });

  describe("className", () => {
    const customClass = "custom-class";
    it("should render without custom class", () => {
      const { getByRole } = render(<ButtonWithArrow direction={BUTTON_DIRECTIONS.LEFT} />);
      expect(getByRole("button")).not.toHaveClass(customClass);
    });
    it("should render with custom class", () => {
      const { getByRole } = render(
        <ButtonWithArrow direction={BUTTON_DIRECTIONS.LEFT} className={customClass} />,
      );
      expect(getByRole("button")).toHaveClass(customClass);
    });
  });

  describe("withBorder", () => {
    it("should render with (default) border", () => {
      const { getByRole } = render(<ButtonWithArrow direction={BUTTON_DIRECTIONS.LEFT} />);
      expect(getByRole("button")).toHaveClass("px-6 border-2 border-black");
      expect(getByRole("button")).not.toHaveClass(
        "pr-2 pl-4 sm:px-4 border-0 sm:border-2 border-black",
      );
    });
    it("should render without border", () => {
      const { getByRole } = render(
        <ButtonWithArrow direction={BUTTON_DIRECTIONS.LEFT} withBorder={false} />,
      );
      expect(getByRole("button")).not.toHaveClass("px-6 border-2 border-black");
      expect(getByRole("button")).toHaveClass(
        "pr-2 pl-4 sm:px-4 border-0 sm:border-2 border-black",
      );
    });
  });

  describe("onClick", () => {
    const mockOnClick = jest.fn();
    it("should call mock function when button is clicked", () => {
      const { getByRole } = render(
        <ButtonWithArrow direction={BUTTON_DIRECTIONS.LEFT} onClick={mockOnClick} />,
      );
      fireEvent.click(getByRole("button"));
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  describe("children", () => {
    const buttonText = "ButtonWithArrow text";
    it("should render ButtonWithArrow with custom text", () => {
      const { getByRole } = render(
        <ButtonWithArrow direction={BUTTON_DIRECTIONS.LEFT}>{buttonText}</ButtonWithArrow>,
      );
      expect(getByRole("button")).toHaveTextContent(buttonText);
    });
  });
});
