import { getLinesCount, pluralize } from "../words";

describe("utils/words", () => {
  describe("getLinesCount", () => {
    it("should count single-line text as one line", () => {
      expect(getLinesCount("abc")).toBe(1);
    });

    it("should correctly count lines in multiline text", () => {
      expect(getLinesCount("abc\nd\nefg")).toBe(3);
    });

    it("should count leading new line characters", () => {
      expect(getLinesCount("\nabc")).toBe(2);
    });

    it("should count trailing new line characters", () => {
      expect(getLinesCount("abc\n\n")).toBe(3);
    });
  });

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
