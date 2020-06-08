import React from "react";
import { shallow } from "enzyme";

import HomePage from "@/pages/index";

describe("HomePage", () => {
  it("should render without errors", () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find("title").text()).toBe("Monterail e-learning app");
  });
});
