const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export function value(color) {
  return Number(String(COLORS.indexOf(color[0])+String(COLORS.indexOf(color[1]))))
};