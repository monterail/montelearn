import React from "react";
import { shallow } from "enzyme";

import Login from "@/pages/users/login";

describe("Login", () => {
  it("renders Login page with no errors", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  });
});
