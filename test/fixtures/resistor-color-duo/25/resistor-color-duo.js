const COLORS = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white",
];

export const codeGolf = colors => {
  return Number(colors.map(c => COLORS.indexOf(c).toString()).join(""));
};

export function value(colors) {
  const result = Array(colors.length);

  for (const name of colors) {
    const index = COLORS.indexOf(name);

    if (index == -1) throw new Error(`Invalid color: ${name}`);

    result.push(index.toString());
  }

  return Number(result.join(""));
}
