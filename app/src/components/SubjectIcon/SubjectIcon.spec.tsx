import React from "react";
import { render, cleanup } from "@testing-library/react";

import { SUBJECT_ICONS } from "@/types/subject";
import SubjectIcon from "./SubjectIcon";

describe("SubjectIcon", () => {
  let utils;
  beforeEach(() => {
    utils = render(<SubjectIcon icon={SUBJECT_ICONS.BABUSHKA} className="testClass" />);
  });
  afterEach(() => cleanup);

  it("it renders correct icon", async () => {
    expect(await utils.findByTestId("svg-babushka")).toBeInTheDocument();
  });

  it("assigns correct className", async () => {
    expect(await utils.findByTestId("subject-icon")).toHaveClass("testClass");
  });
});
