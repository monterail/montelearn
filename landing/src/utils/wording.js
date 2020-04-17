export function pluralize(x, singular, plural) {
  return `${x} ${x === 1 ? singular : plural}`;
}
