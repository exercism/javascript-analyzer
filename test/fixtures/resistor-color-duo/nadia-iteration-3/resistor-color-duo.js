const COLOR_CODES = {
  'black': 0,
  'brown': 1,
  'red': 2,
  'orange': 3,
  'yellow': 4,
  'green': 5,
  'blue': 6,
  'violet': 7,
  'grey': 8,
  'white': 9,
};

const colorCode = color => COLOR_CODES[color];

export const decodedValue = colors => Number(colors.slice(0, 2).map(colorCode).join(''));