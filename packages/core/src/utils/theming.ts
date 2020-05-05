export function rem(...args: number[]): string {
  return args.map((x) => (x === 0 ? "0" : `${x / 16}rem`)).join(" ");
}

export function getRGB(hex: string): Record<"r" | "g" | "b", number> {
  // '#cccc00' -> 'cccc00'
  const hexNoHash = hex.replace("#", "");

  // 'cf0' -> 'ccff00'
  // 'cccc00' -> 'cccc00'
  const longHex = hexNoHash.length === 3 ? hexNoHash.replace(/(.)/g, "$1$1") : hexNoHash;

  // 'ccf400' -> ['cc', 'f4', '00']
  const match = longHex.match(/.{2}/g);

  if (match === null) {
    throw new Error("Argument is not a valid hex color");
  }

  const [r, g, b] = match;

  return {
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16),
  };
}

export function hexToRGBA(hex: string, alpha: number): string {
  const { r, g, b } = getRGB(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}
