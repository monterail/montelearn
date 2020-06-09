import React from "react";
import { shallow } from "enzyme";

import ResetPassword from "@/pages/users/reset-password";

describe("ResetPassword", () => {
  it("renders ResetPassword page with no errors", () => {
    const wrapper = shallow(<ResetPassword />);
    expect(wrapper.exists()).toBe(true);
  });
});
