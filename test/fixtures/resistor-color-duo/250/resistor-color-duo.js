const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export function decodedValue(colors) {
  return colors.reduce((acc, color) => acc * 10 + COLORS.findIndex(x => x === color), 0);
}
