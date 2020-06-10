import React from "react";
import { shallow } from "enzyme";

import Text from "./Text";

describe("Text", () => {
  describe("className", () => {
    const customClass = "custom-class";
    it("should render Text without custom class", () => {
      const wrapper = shallow(<Text />);
      expect(wrapper.find("p").hasClass(customClass)).toBe(false);
    });
    it("should render Text with custom class", () => {
      const wrapper = shallow(<Text className={customClass} />);
      expect(wrapper.find("p").hasClass(customClass)).toBe(true);
    });
  });

  describe("children", () => {
    const customText = "Custom text";
    it("should render Text with custom text", () => {
      const wrapper = shallow(<Text>{customText}</Text>);
      expect(wrapper.find("p").text()).toMatch(customText);
    });
    it("should render Text with custom child paragraph", () => {
      const wrapper = shallow(
        <Text>
          <span>{customText}</span>
        </Text>,
      );
      expect(wrapper.find("p").find("span").text()).toMatch(customText);
    });
  });
});
