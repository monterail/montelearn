import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import Dropdown from "./Dropdown";

describe("dropdown", () => {
  afterEach(() => cleanup);

  describe("props", () => {
    const label = "test label";
    const options = [
      {
        value: "test",
        name: "option name",
      },
      { value: "selected", name: "selected option name" },
    ];
    const value = "selected";
    const placeholder = "Test placeholder";
    const handleChangeMock = jest.fn();

    it("renders label", async () => {
      const { findByText } = render(<Dropdown label={label} />);
      expect(await findByText(label)).toBeInTheDocument();
    });

    it("renders placeholder", async () => {
      const { findByText } = render(<Dropdown placeholder={placeholder} />);
      expect(await findByText(placeholder)).toBeInTheDocument();
    });

    describe("clicking on label", () => {
      let utils;
      beforeEach(() => {
        utils = render(
          <Dropdown
            name="wrapper"
            label={label}
            options={options}
            value={value}
            handleChange={handleChangeMock}
          />,
        );
        fireEvent.click(utils.getByTestId("dropdown"));
      });

      it("opens the dropdown", async () => {
        expect(await utils.findByTestId("dropdown-opened")).toBeInTheDocument();
      });

      it("renders the options correctly", () => {
        expect(utils.queryAllByText(/option name/).length).toEqual(3);
      });

      describe("clicking on option", () => {
        beforeEach(() => {
          fireEvent.click(utils.getByText(options[0].name));
        });

        it("fires the handleChange method", () => {
          expect(handleChangeMock).toHaveBeenCalled();
          expect(handleChangeMock).toHaveBeenCalledWith(options[0]);
        });

        it("closes the dropdown", () => {
          expect(utils.queryByTestId("dropdown-opened")).not.toBeInTheDocument();
        });
      });
    });
  });
});
