import React from "react";
import { render, cleanup, act } from "@testing-library/react";
import preloadAll from "jest-next-dynamic";

import { SUBJECT_ICONS } from "@/types/subject";
import SubjectIcon from "./SubjectIcon";

describe("SubjectIcon", () => {
  let utils;
  beforeEach(async () => {
    await act(async () => {
      utils = render(<SubjectIcon icon={SUBJECT_ICONS.BABUSHKA} className="testClass" />);
      await preloadAll();
    });
  });
  afterEach(() => cleanup);

  it("it renders correct icon", async () => {
    expect(await utils.findByTestId("svg-babushka")).toBeInTheDocument();
  });

  it("assigns correct className", async () => {
    expect(await utils.findByTestId("subject-icon")).toHaveClass("testClass");
  });
});
