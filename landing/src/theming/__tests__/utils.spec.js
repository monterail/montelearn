import { getRGB, hexToRGBA, rem } from "../utils";

describe("theming/utils", () => {
  describe("rem", () => {
    it("should return 0 for 0 px", () => {
      expect(rem(0)).toBe("0");
    });

    it("should assume base font size set to 16px", () => {
      expect(rem(16)).toBe("1rem");
    });

    it("should support multiple arguments", () => {
      expect(rem(0, 16, 20, 0)).toBe("0 1rem 1.25rem 0");
    });
  });

  describe("getRGB", () => {
    it("should correctly transform hex color in long format", () => {
      expect(getRGB("#ffffff")).toStrictEqual({ r: 255, g: 255, b: 255 });
    });

    it("should correctly transform hex color in short format", () => {
      expect(getRGB("#fff")).toStrictEqual({ r: 255, g: 255, b: 255 });
    });

    it("should correctly transform hex color in uppercase", () => {
      expect(getRGB("#FFF")).toStrictEqual({ r: 255, g: 255, b: 255 });
    });

    it("should work for hex color without a leading hash", () => {
      expect(getRGB("00a")).toStrictEqual({ r: 0, g: 0, b: 170 });
    });
  });

  describe("hexToRGBA", () => {
    it("should return RGBA", () => {
      expect(hexToRGBA("#000", 1)).toBe("rgba(0,0,0,1)");
    });

    it("should return RGBA with non-1 alpha", () => {
      expect(hexToRGBA("#fff", 0.54)).toBe("rgba(255,255,255,0.54)");
    });
  });
});
