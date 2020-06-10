import React from "react";
import { shallow } from "enzyme";

import Breadcrumbs from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  it("renders correct options", () => {
    const wrapper = shallow(<Breadcrumbs options={["David", "Bowie"]} />);
    expect(wrapper.find("li").length).toEqual(2);
  });
  it("calls backclick function", () => {
    const handleBackMock = jest.fn();
    const wrapper = shallow(<Breadcrumbs options={["One"]} handleBackClick={handleBackMock} />);
    wrapper.find("ButtonWithArrow").simulate("click");
    expect(handleBackMock.mock.calls.length).toEqual(1);
  });
});
