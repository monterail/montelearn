import fetch from "isomorphic-unfetch";

import sendRequest from "../api";

jest.mock("isomorphic-unfetch");

describe("api", () => {
  const API_PLAYGROUND_URL = "http://lessonapi.com";

  beforeEach(() => {
    process.env.API_PLAYGROUND_URL = API_PLAYGROUND_URL;
  });

  afterEach(() => {
    delete process.env.API_PLAYGROUND_URL;
  });

  describe("sendRequest", () => {
    it("should send request and pass configuration to fetch function", async () => {
      await sendRequest("GET", "/api/lesson", { id: 1 });

      expect(fetch).toBeCalledWith(`${API_PLAYGROUND_URL}/api/lesson`, {
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

      expect(await sendRequest("GET", "/api/lesson", {})).toStrictEqual({
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

      expect(await sendRequest("GET", "/api/lesson", {})).toStrictEqual({
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

      expect(await sendRequest("GET", "/api/lesson", {})).toStrictEqual({
        headers: [],
        ok: false,
        status: 111,
        statusText: "Connection Refused",
        body: null,
      });
    });
  });
});
