import React from "react";
import { render, cleanup } from "@testing-library/react";

import RadioGroup from "./RadioGroup";

describe("RadioGroup", () => {
  const baseProps = {
    className: "custom-class",
    onClick: jest.fn().mockReturnValue({}),
    optionKey: "answer",
    options: [{ answer: "Yes" }, { answer: "No" }],
  };
  const isLocked = true;
  const isNotLocked = false;
  const isSelected = jest.fn().mockReturnValue(true);
  const isNotSelected = jest.fn().mockReturnValue(false);
  const isCorrect = jest.fn().mockReturnValue(true);
  const isNotCorrect = jest.fn().mockReturnValue(false);

  afterEach(() => cleanup);

  describe("props", () => {
    it("should render with proper customClass", async () => {
      const { findAllByTestId } = render(
        <RadioGroup
          isLocked={isLocked}
          isSelected={isSelected}
          isCorrect={isCorrect}
          {...baseProps}
        />,
      );
      const radioGroup = await findAllByTestId("radio-group");

      expect(radioGroup[0]).toBeInTheDocument();
      expect(radioGroup[0]).toHaveClass(baseProps.className);
    });

    it("should render proper coursor class with isLocked set to false", async () => {
      const { findAllByTestId } = render(
        <RadioGroup
          isLocked={isNotLocked}
          isSelected={isSelected}
          isCorrect={isNotCorrect}
          {...baseProps}
        />,
      );
      const radioGroup = await findAllByTestId("radio-group");

      expect(radioGroup[0]).toBeInTheDocument();
      expect(radioGroup[0]).toHaveClass("cursor-pointer");
    });

    it("should render proper coursor class with isLocked set to true", async () => {
      const { findAllByTestId } = render(
        <RadioGroup
          isLocked={isLocked}
          isSelected={isSelected}
          isCorrect={isCorrect}
          {...baseProps}
        />,
      );
      const radioGroup = await findAllByTestId("radio-group");

      expect(radioGroup[0]).toBeInTheDocument();
      expect(radioGroup[0]).toHaveClass("cursor-none");
    });

    it("should render proper container class when isSelected return true", async () => {
      const { findAllByTestId } = render(
        <RadioGroup
          isLocked={isNotLocked}
          isSelected={isSelected}
          isCorrect={isNotCorrect}
          {...baseProps}
        />,
      );
      const radioGroup = await findAllByTestId("radio-group");

      expect(radioGroup[0]).toBeInTheDocument();
      expect(radioGroup[0]).toHaveClass("bg-red-monterail");
    });

    it("should render proper container class when isSelected return false", async () => {
      const { findAllByTestId } = render(
        <RadioGroup
          isLocked={isNotLocked}
          isSelected={isNotSelected}
          isCorrect={isNotCorrect}
          {...baseProps}
        />,
      );
      const radioGroup = await findAllByTestId("radio-group");

      expect(radioGroup[0]).toBeInTheDocument();
      expect(radioGroup[0]).toHaveClass("bg-red-100");
    });

    it("should render proper class when the answer is correct", async () => {
      const { findAllByTestId } = render(
        <RadioGroup
          isLocked={isLocked}
          isSelected={isSelected}
          isCorrect={isCorrect}
          {...baseProps}
        />,
      );
      const radioGroup = await findAllByTestId("radio-group");
      expect(radioGroup[0]).toBeInTheDocument();
      expect(radioGroup[0]).toHaveClass("bg-green-200");
    });
  });

  describe("children", () => {
    it("should render span with proper circle class and children when isSelected return true", () => {
      const { container } = render(
        <RadioGroup
          isLocked={isLocked}
          isSelected={isSelected}
          isCorrect={isNotCorrect}
          {...baseProps}
        />,
      );

      expect(container.querySelector("span").hasChildNodes()).toBeTruthy();
      expect(container.querySelector("span")).toHaveClass("bg-white border-red-monterail");
    });

    it("should render span with proper circle class and no children when isSelected return false", () => {
      const { container } = render(
        <RadioGroup
          isLocked={isLocked}
          isSelected={isNotSelected}
          isCorrect={isNotCorrect}
          {...baseProps}
        />,
      );

      expect(container.querySelector("span").hasChildNodes()).toBeFalsy();
      expect(container.querySelector("span")).toHaveClass("bg-red-100 border-red-200");
    });

    it("should render span with proper circle class and children when isCorrect returns true", () => {
      const { container } = render(
        <RadioGroup
          isLocked={isLocked}
          isSelected={isSelected}
          isCorrect={isCorrect}
          {...baseProps}
        />,
      );

      expect(container.querySelector("span").hasChildNodes()).toBeTruthy();
      expect(container.querySelector("span")).toHaveClass("bg-white border-green-200");
    });
  });
});
