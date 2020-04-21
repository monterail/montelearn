import { pluralize } from "../wording";

describe("utils/wording", () => {
  describe("pluralize", () => {
    it("should return singular form if quantity equals 1", () => {
      expect(pluralize(1, "atom", "atoms")).toBe("1 atom");
    });

    it("should return plural form if quantity is different than 1", () => {
      expect(pluralize(0, "atom", "atoms")).toBe("0 atoms");
      expect(pluralize(2, "atom", "atoms")).toBe("2 atoms");
    });
  });
});
