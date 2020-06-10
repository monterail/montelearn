import React from "react";
import { shallow } from "enzyme";

import Title from "./Title";

describe("Title", () => {
  describe("className", () => {
    const customClass = "custom-class";
    it("should render Title without custom class", () => {
      const wrapper = shallow(<Title />);
      expect(wrapper.find("h1").hasClass(customClass)).toBe(false);
    });
    it("should render Title with custom class", () => {
      const wrapper = shallow(<Title className={customClass} />);
      expect(wrapper.find("h1").hasClass(customClass)).toBe(true);
    });
  });

  describe("children", () => {
    const customText = "Custom text";
    it("should render Title with custom text", () => {
      const wrapper = shallow(<Title>{customText}</Title>);
      expect(wrapper.find("h1").text()).toMatch(customText);
    });
    it("should render Title with custom child paragraph", () => {
      const wrapper = shallow(
        <Title>
          <p>{customText}</p>
        </Title>,
      );
      expect(wrapper.find("h1").find("p").text()).toMatch(customText);
    });
  });
});
