import { isUrlLike } from "../paths";

describe("utils/paths", () => {
  describe("isUrlLike", () => {
    it("should return true for valid url", () => {
      expect(isUrlLike("http://google.com")).toBe(true);
      expect(isUrlLike("https://google.com")).toBe(true);
    });

    it("should return true for valid url without protocol", () => {
      expect(isUrlLike("//google.com")).toBe(true);
    });
  });
});
