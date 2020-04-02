export function rem(...args) {
  return args.map((x) => (x === 0 ? "0" : `${x / 16}rem`)).join(" ");
}

export function getRGB(hex) {
  // '#cccc00' -> 'cccc00'
  const hexNoHash = hex.replace("#", "");

  // 'cf0' -> 'ccff00'
  // 'cccc00' -> 'cccc00'
  const longHex = hexNoHash.length === 3 ? hexNoHash.replace(/(.)/g, "$1$1") : hexNoHash;

  // 'ccf400' -> ['cc', 'f4', '00']
  const [r, g, b] = longHex.match(/.{2}/g);

  return {
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16),
  };
}

export function hexToRGBA(hex, alpha) {
  const { r, g, b } = getRGB(hex);
  return `rgba(${r},${g},${b},${alpha})`;
}
