export function toModuleName(name: string) {
  return name
    .replace(/\_+|-+/g, " ")
    .replace(/\.svg/g, "")
    .split(" ")
    .map((_) => {
      let first_char = _.slice(0, 1);

      if (first_char.match(/[0-9]/)) {
        first_char = "_" + first_char;
      }

      return first_char.toUpperCase() + _.slice(1);
    })
    .join("");
}

export function mapProps(properties: Record<string, string>) {
  return Object.keys(properties)
    .map((property) => `${property}="${properties[property]}"`)
    .join(" ");
}
