import React from "react";
import { shallow } from "enzyme";

import Button from "./Button";

describe("Button", () => {
  it("should be defined", () => {
    expect(Button).toBeDefined();
  });

  describe("className", () => {
    const customClass = "custom-class";
    it("should render Title without custom class", () => {
      const wrapper = shallow(<Button />);
      expect(wrapper.find("button").hasClass(customClass)).toBe(false);
    });
    it("should render Title with custom class", () => {
      const wrapper = shallow(<Button className={customClass} />);
      expect(wrapper.find("button").hasClass(customClass)).toBe(true);
    });
  });

  describe("onClick", () => {
    const mockOnClick = jest.fn();
    it("should call mock function when button is clicked", () => {
      const wrapper = shallow(<Button onClick={mockOnClick} />);
      wrapper.simulate("click");
      expect(mockOnClick).toHaveBeenCalled();
    });
  });

  describe("children", () => {
    const buttonText = "Button text";
    it("should render Button with custom text", () => {
      const wrapper = shallow(<Button>{buttonText}</Button>);
      expect(wrapper.find("button").text()).toMatch(buttonText);
    });
  });
});
