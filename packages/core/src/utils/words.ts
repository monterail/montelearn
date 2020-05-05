/** @__PURE__ */
export function pluralize(x: number, singular: string, plural: string): string {
  return `${x} ${x === 1 ? singular : plural}`;
}

/** @__PURE__ */
export function getLinesCount(x: string): number {
  return (x.match(/\n/g) || []).length + 1;
}
