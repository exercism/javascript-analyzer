const resistor = {
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

const COLORS = [];

Object.entries(resistor).forEach(([code, i]) => (COLORS[i] = code));

export function colorCode(code) {
  return resistor[code];
}

export { COLORS };
