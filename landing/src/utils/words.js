/** @__PURE__ */
export function pluralize(x, singular, plural) {
  return `${x} ${x === 1 ? singular : plural}`;
}

/** @__PURE__ */
export function getLinesCount(x) {
  return (x.match(/\n/g) || []).length + 1;
}
