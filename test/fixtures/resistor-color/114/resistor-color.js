export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export function colorCode(color) {
  let resistorColor = color.toLowerCase();
  return COLORS.indexOf(resistorColor);
}