
export function rem(...args) {
  return args.map((x) => x === 0 ? '0' : `${x/16}rem`).join(" ");
}
