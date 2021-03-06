/** @__PURE__ */
export function isUrlLike(x: string): boolean {
  return x.slice(0, 4) === "http" || x.slice(0, 2) === "//";
}
