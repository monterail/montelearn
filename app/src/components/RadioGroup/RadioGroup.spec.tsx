import React from "react";
import { render, cleanup } from "@testing-library/react";

import RadioGroup from "./RadioGroup";

describe("RadioGroup", () => {
  const customClass = "custom-class";
  const isLocked = false;
  const isSelected = (_option: any) => true;
  const onClick = (_option: any) => {};
  const optionKey = "answer";
  const options = [{ answer: "Yes" }, { answer: "No" }];

  afterEach(() => cleanup);

  describe("props", () => {
    it("should render with proper customClass", async () => {
      const { findAllByTestId } = render(
        <RadioGroup
          className={customClass}
          isLocked={isLocked}
          isSelected={isSelected}
          onClick={onClick}
          optionKey={optionKey}
          options={options}
        />,
      );
      const radioGroup = await findAllByTestId("radio-group");

      expect(radioGroup[0]).toBeInTheDocument();
      expect(radioGroup[0]).toHaveClass(customClass);
    });

    it("should render proper coursor class with isLocked set to false", async () => {
      const { findAllByTestId } = render(
        <RadioGroup
          className={customClass}
          isLocked={false}
          isSelected={isSelected}
          onClick={onClick}
          optionKey={optionKey}
          options={options}
        />,
      );
      const radioGroup = await findAllByTestId("radio-group");

      expect(radioGroup[0]).toBeInTheDocument();
      expect(radioGroup[0]).toHaveClass("cursor-pointer");
    });

    it("should render proper coursor class with isLocked set to true", async () => {
      const { findAllByTestId } = render(
        <RadioGroup
          className={customClass}
          isLocked={true}
          isSelected={isSelected}
          onClick={onClick}
          optionKey={optionKey}
          options={options}
        />,
      );
      const radioGroup = await findAllByTestId("radio-group");

      expect(radioGroup[0]).toBeInTheDocument();
      expect(radioGroup[0]).toHaveClass("cursor-none");
    });

    it("should render proper container class when isSelected return true", async () => {
      const { findAllByTestId } = render(
        <RadioGroup
          className={customClass}
          isLocked={false}
          isSelected={(_option: any) => true}
          onClick={onClick}
          optionKey={optionKey}
          options={options}
        />,
      );
      const radioGroup = await findAllByTestId("radio-group");

      expect(radioGroup[0]).toBeInTheDocument();
      expect(radioGroup[0]).toHaveClass("bg-red-monterail");
    });

    it("should render proper container class when isSelected return false", async () => {
      const { findAllByTestId } = render(
        <RadioGroup
          className={customClass}
          isLocked={false}
          isSelected={(_option: any) => false}
          onClick={onClick}
          optionKey={optionKey}
          options={options}
        />,
      );
      const radioGroup = await findAllByTestId("radio-group");

      expect(radioGroup[0]).toBeInTheDocument();
      expect(radioGroup[0]).toHaveClass("bg-red-100");
    });
  });

  describe("children", () => {
    it("should render span with proper circle class and children when isSelected return true", async () => {
      const { container } = render(
        <RadioGroup
          className={customClass}
          isLocked={isLocked}
          isSelected={(_option: any) => true}
          onClick={onClick}
          optionKey={optionKey}
          options={options}
        />,
      );

      expect(container.querySelector("span").hasChildNodes()).toBeTruthy();
      expect(container.querySelector("span")).toHaveClass("bg-white border-red-monterail");
    });

    it("should render span with proper circle class and no children when isSelected return false", async () => {
      const { container } = render(
        <RadioGroup
          className={customClass}
          isLocked={isLocked}
          isSelected={(_option: any) => false}
          onClick={onClick}
          optionKey={optionKey}
          options={options}
        />,
      );

      expect(container.querySelector("span").hasChildNodes()).toBeFalsy();
      expect(container.querySelector("span")).toHaveClass("bg-red-100 border-red-200");
    });
  });
});
