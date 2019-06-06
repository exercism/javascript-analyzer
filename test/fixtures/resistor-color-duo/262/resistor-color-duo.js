const COLORS_OBJ = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
};

const value = colors => parseInt(colors.reduce((acc, color) => (
    acc + COLORS_OBJ[color]
  ), ''), 10);

module.exports = {
  value,
};
