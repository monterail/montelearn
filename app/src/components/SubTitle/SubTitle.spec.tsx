import React from "react";
import { shallow } from "enzyme";

import SubTitle from "./SubTitle";

describe("SubTitle", () => {
  describe("className", () => {
    const customClass = "custom-class";
    it("should render SubTitle without custom class", () => {
      const wrapper = shallow(<SubTitle />);
      expect(wrapper.find("h2").hasClass(customClass)).toBe(false);
    });
    it("should render SubTitle with custom class", () => {
      const wrapper = shallow(<SubTitle className={customClass} />);
      expect(wrapper.find("h2").hasClass(customClass)).toBe(true);
    });
  });

  describe("children", () => {
    const customText = "Custom text";
    it("should render SubTitle with custom text", () => {
      const wrapper = shallow(<SubTitle>{customText}</SubTitle>);
      expect(wrapper.find("h2").text()).toMatch(customText);
    });
    it("should render SubTitle with custom child paragraph", () => {
      const customParagraph = `<p>${customText}</p>`;
      const wrapper = shallow(
        <SubTitle>
          <p>{customText}</p>
        </SubTitle>,
      );
      expect(wrapper.find("h2").find("p").html()).toEqual(customParagraph);
    });
  });
});
