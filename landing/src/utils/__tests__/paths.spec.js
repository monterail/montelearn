import { ensureLeadingSlash, isUrlLike } from "../paths";

describe("utils/paths", () => {
  describe("ensureLeadingSlash", () => {
    it("should add leading slash if missing", () => {
      expect(ensureLeadingSlash("abc/def")).toBe("/abc/def");
    });

    it("should not add leading slash if it's already there", () => {
      expect(ensureLeadingSlash("/abc/def")).toBe("/abc/def");
    });
  });

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
