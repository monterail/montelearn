import React from "react";
import { shallow } from "enzyme";

import Register from "@/pages/users/register";

describe("Register", () => {
  it("renders Register page with no errors", () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.exists()).toBe(true);
  });
});
