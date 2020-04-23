import fetch from "isomorphic-unfetch";

import sendRequest from "../api";

jest.mock("isomorphic-unfetch");

const FAKE_API_URL = "http://fake.backend/api/lesson";

describe("api", () => {
  describe("sendRequest", () => {
    it("should send request and pass configuration to fetch function", async () => {
      await sendRequest("GET", FAKE_API_URL, { id: 1 });

      expect(fetch).toBeCalledWith(FAKE_API_URL, {
        method: "GET",
        data: { id: 1 },
      });
    });

    it("should handle successful response", async () => {
      fetch.mockResolvedValueOnce({
        headers: {
          entries: () => [],
        },
        json: () => Promise.resolve({ data: { foo: "bar" } }),
        ok: true,
        status: 200,
        statusText: "OK",
      });

      expect(await sendRequest("GET", FAKE_API_URL, {})).toStrictEqual({
        headers: [],
        ok: true,
        status: 200,
        statusText: "OK",
        body: { foo: "bar" },
      });
    });

    it("should handle failed response", async () => {
      fetch.mockResolvedValueOnce({
        headers: {
          entries: () => [],
        },
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      expect(await sendRequest("GET", FAKE_API_URL, {})).toStrictEqual({
        headers: [],
        ok: false,
        status: 404,
        statusText: "Not Found",
        body: null,
      });
    });

    it("should treat error thrown by fetch() as connection error", async () => {
      fetch.mockImplementationOnce(() => {
        return Promise.reject();
      });

      expect(await sendRequest("GET", FAKE_API_URL, {})).toStrictEqual({
        headers: [],
        ok: false,
        status: 111,
        statusText: "Connection Refused",
        body: null,
      });
    });
  });
});
