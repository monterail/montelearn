export function ensureLeadingSlash(x) {
  return x.charAt(0) === "/" ? x : `/${x}`;
}
