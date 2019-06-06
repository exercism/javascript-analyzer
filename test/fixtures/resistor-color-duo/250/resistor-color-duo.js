const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export function value(colors) {
  return colors.reduce((acc, color) => acc * 10 + COLORS.findIndex(x => x === color), 0);
}
