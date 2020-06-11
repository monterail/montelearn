import React from "react";
import { shallow } from "enzyme";

import { BUTTON_DIRECTIONS } from "@/constants/buttonDirecitons";
import SvgArrowLeft from "@/components/svg/SvgArrowLeft";
import SvgArrowRight from "@/components/svg/SvgArrowRight";
import ButtonWithArrow from "./ButtonWithArrow";

describe("ButtonWithArrow", () => {
  describe("is defined/matches snapshot", () => {
    it("should be defined", () => {
      expect(ButtonWithArrow).toBeDefined();
    });
    it("should render correctly", () => {
      const tree = shallow(<ButtonWithArrow direction={BUTTON_DIRECTIONS.LEFT} />);
      expect(tree).toMatchSnapshot();
    });
  });

  describe("direction", () => {
    it("should render with SvgArrowLeft", () => {
      const wrapper = shallow(<ButtonWithArrow direction={BUTTON_DIRECTIONS.LEFT} />);
      expect(
        wrapper
          .find("button")
          .children()
          .contains(<SvgArrowLeft />),
      ).toEqual(true);
    });
    it("should render with SvgArrowRight", () => {
      const wrapper = shallow(<ButtonWithArrow direction={BUTTON_DIRECTIONS.RIGHT} />);
      expect(
        wrapper
          .find("button")
          .children()
          .contains(<SvgArrowRight />),
      ).toEqual(true);
    });
  });

  describe("className", () => {
    const customClass = "custom-class";
    it("should render without custom class", () => {
      const wrapper = shallow(<ButtonWithArrow direction={BUTTON_DIRECTIONS.LEFT} />);
      expect(wrapper.find("button").hasClass(customClass)).toBe(false);
    });
    it("should render with custom class", () => {
      const wrapper = shallow(
        <ButtonWithArrow direction={BUTTON_DIRECTIONS.LEFT} className={customClass} />,
      );
      expect(wrapper.find("button").hasClass(customClass)).toBe(true);
    });
  });

  describe("withBorder", () => {
    it("should render with (default) border", () => {
      const wrapper = shallow(<ButtonWithArrow direction={BUTTON_DIRECTIONS.LEFT} />);
      expect(wrapper.find("button").hasClass("px-6 border-2 border-black")).toBe(true);
      expect(
        wrapper.find("button").hasClass("pr-2 pl-4 sm:px-4 border-0 sm:border-2 border-black"),
      ).toBe(false);
    });
    it("should render without border", () => {
      const wrapper = shallow(
        <ButtonWithArrow direction={BUTTON_DIRECTIONS.LEFT} withBorder={false} />,
      );
      expect(wrapper.find("button").hasClass("px-6 border-2 border-black")).toBe(false);
      expect(
        wrapper.find("button").hasClass("pr-2 pl-4 sm:px-4 border-0 sm:border-2 border-black"),
      ).toBe(true);
    });
  });

  describe("onClick", () => {
    const mockOnClick = jest.fn();
    it("should call mock function when button is clicked", () => {
      const wrapper = shallow(
        <ButtonWithArrow direction={BUTTON_DIRECTIONS.LEFT} onClick={mockOnClick} />,
      );
      wrapper.simulate("click");
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  describe("children", () => {
    const buttonText = "ButtonWithArrow text";
    it("should render ButtonWithArrow with custom text", () => {
      const wrapper = shallow(
        <ButtonWithArrow direction={BUTTON_DIRECTIONS.LEFT}>{buttonText}</ButtonWithArrow>,
      );
      expect(wrapper.find("button").text()).toMatch(buttonText);
    });
  });
});
