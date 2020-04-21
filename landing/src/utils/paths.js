/** @__PURE__ */
export function ensureLeadingSlash(x) {
  return x.charAt(0) === "/" ? x : `/${x}`;
}

/** @__PURE__ */
export function isUrlLike(x) {
  return x.slice(0, 4) === "http" || x.slice(0, 2) === "//";
}
