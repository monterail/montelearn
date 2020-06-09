import React from "react";
import { shallow } from "enzyme";

import ForgotPassword from "@/pages/users/forgot-password";

describe("ForgotPassword", () => {
  it("renders ForgotPassword page with no errors", () => {
    const wrapper = shallow(<ForgotPassword />);
    expect(wrapper.exists()).toBe(true);
  });
});
