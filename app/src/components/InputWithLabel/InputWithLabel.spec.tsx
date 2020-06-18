import React from "react";
import { render, cleanup, fireEvent, within } from "@testing-library/react";

import InputWithLabel from "./InputWithLabel";

describe("InputWithLabel", () => {
  afterEach(() => cleanup);

  describe("required props", () => {
    const id = "unique id";
    const label = "test label";
    const name = "test name";
    const value = "test value";
    const handleChange = jest.fn();

    const setupInputWithRequiredProps = () => {
      const utils = render(
        <InputWithLabel id={id} value={value} name={name} label={label} onChange={handleChange} />,
      );
      const input = utils.getByLabelText(label);
      return {
        input,
        ...utils,
      };
    };

    it("has correct id prop", () => {
      const { input } = setupInputWithRequiredProps();

      expect(input).toHaveAttribute("id");
      expect(input.id).toEqual(id);
    });

    it("has correct value prop", () => {
      const { input } = setupInputWithRequiredProps();

      expect(input).toHaveAttribute("value");
      expect(input).toHaveValue(value);
    });

    it("has correct name prop", () => {
      const { input, container } = setupInputWithRequiredProps();

      expect(input).toHaveAttribute("name");
      expect(
        container.querySelector(`input[name="${name}"]`).attributes.getNamedItem("name").value,
      ).toEqual(name);
    });

    it("has correct label prop", async () => {
      const { findByLabelText } = setupInputWithRequiredProps();

      expect(await findByLabelText(label)).toBeInTheDocument();
    });

    it("calls handleChange prop on value change", () => {
      const { input } = setupInputWithRequiredProps();
      fireEvent.change(input, { target: { value: "new value" } });

      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("optional props", () => {
    const id = "unique id";
    const label = "test label";
    const name = "test name";
    const value = "test value";
    const placeholder = "test placeholder";
    const type = "email";
    const errors = ["test error one", "test error two"];
    const handleChange = jest.fn();

    const setupInputWithOptionalProps = () => {
      const utils = render(
        <InputWithLabel
          id={id}
          value={value}
          name={name}
          label={label}
          onChange={handleChange}
          placeholder={placeholder}
          type={type}
          errors={errors}
        />,
      );
      const input = utils.getByLabelText(label);
      return {
        input,
        ...utils,
      };
    };

    it("has correct placeholder prop", () => {
      const { getByPlaceholderText } = setupInputWithOptionalProps();

      expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
    });

    it("has correct type prop", async () => {
      const { input, container } = setupInputWithOptionalProps();

      expect(input).toHaveAttribute("type");
      expect(
        container.querySelector(`input[type="${type}"]`).attributes.getNamedItem("type").value,
      ).toEqual(type);
    });

    it("renders InputErrors when has error props", async () => {
      const { container } = setupInputWithOptionalProps();

      const foundErrors = within(container).getAllByText(/test error/);
      expect(foundErrors).toHaveLength(2);
    });
  });
});
