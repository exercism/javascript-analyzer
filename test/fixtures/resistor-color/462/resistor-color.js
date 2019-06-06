const color_map = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9
};
export const COLORS = Object.keys(color_map).sort((a, b) => color_map.a - color_map.b);
export const colorCode = (color) => color_map[color];
