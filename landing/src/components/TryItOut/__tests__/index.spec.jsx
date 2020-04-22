import { act, render, screen, fireEvent } from "@testing-library/react";

import api from "../api";
import Component from "../index";

jest.mock("../api");

const endpoints = [
  { displayText: "GET /api/lesson", method: "GET", url: "http://fake.backend/api/lesson" },
  { displayText: "POST /api/tests", method: "POST", url: "http://fake.backend/api/tests" },
];

function createOnChangeEvt(value) {
  return { target: { value } };
}

describe("TryItOut", () => {
  it("should render without errors", () => {
    render(<Component endpoints={endpoints} />);
    expect(screen.getByTestId("TryItOut_Form")).toBeInTheDocument();
  });

  describe("with interaction", () => {
    let mock;

    beforeEach(() => {
      mock = jest.fn(() => {
        return {
          body: {},
          headers: [],
          ok: true,
          status: 200,
          statusText: "OK",
        };
      });
      api.mockImplementationOnce(mock);

      render(<Component endpoints={endpoints} />);
    });

    it("should send request with initial state on submit", async () => {
      await act(async () => {
        fireEvent.click(screen.getByTestId("TryItOut_SubmitButton"));
      });

      const { method, url } = endpoints[0];

      expect(mock).toBeCalledTimes(1);
      expect(mock).toBeCalledWith(method, url, {});
    });

    it("should send request with modified form", async () => {
      const userInput = JSON.stringify({ foo: "bar" });

      fireEvent.change(screen.getByTestId("TryItOut_ParamsInput"), createOnChangeEvt(userInput));
      expect(screen.getByTestId("TryItOut_ParamsInput")).toHaveValue(userInput);

      fireEvent.change(screen.getByTestId("TryItOut_EndpointSelect"), createOnChangeEvt("1"));
      expect(screen.getByTestId("TryItOut_EndpointSelect")).toHaveValue("1");

      await act(async () => {
        fireEvent.click(screen.getByTestId("TryItOut_SubmitButton"));
      });

      const { method, url } = endpoints[1];

      expect(mock).toBeCalledTimes(1);
      expect(mock).toBeCalledWith(method, url, JSON.parse(userInput));
    });

    it("should not submit form for invalid JSON params", async () => {
      // Make this input an invalid JSON.
      const userInput = "{ id: 1 }";

      fireEvent.change(screen.getByTestId("TryItOut_ParamsInput"), createOnChangeEvt(userInput));
      expect(screen.getByTestId("TryItOut_ParamsInput")).toHaveValue(userInput);

      await act(async () => {
        fireEvent.click(screen.getByTestId("TryItOut_SubmitButton"));
      });

      expect(mock).not.toBeCalled();
    });

    it("should render response after successful request", async () => {
      await act(async () => {
        fireEvent.click(screen.getByTestId("TryItOut_SubmitButton"));
      });

      expect(screen.getByTestId("TryItOut_Response")).toBeInTheDocument();
      expect(screen.getByTestId("TryItOut_Response")).toHaveTextContent("Object (empty)");
    });

    it("should render error after failed request", async () => {
      api.mockReset();
      api.mockImplementationOnce(
        jest.fn(() => {
          return {
            body: null,
            headers: [],
            ok: false,
            status: 400,
            statusText: "Bad Request",
          };
        }),
      );

      await act(async () => {
        fireEvent.click(screen.getByTestId("TryItOut_SubmitButton"));
      });

      expect(screen.getByTestId("TryItOut_Response")).toBeInTheDocument();
      expect(screen.getByTestId("TryItOut_Response")).toHaveTextContent("400 Bad Request");
    });
  });
});
