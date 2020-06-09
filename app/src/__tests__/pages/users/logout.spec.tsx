import React from "react";
import { shallow } from "enzyme";

import Logout from "@/pages/users/logout";

describe("Logout", () => {
  it("renders Logout page with no errors", () => {
    const wrapper = shallow(<Logout />);
    expect(wrapper.exists()).toBe(true);
  });
});
