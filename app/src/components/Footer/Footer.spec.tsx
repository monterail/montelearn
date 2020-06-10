import React from "react";
import { shallow } from "enzyme";

import Footer from "./Footer";

describe("Footer", () => {
  it("renders correct message", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find("p").text()).toEqual("Developed with ❤️ by Monterail");
  });
});
