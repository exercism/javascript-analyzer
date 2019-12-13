export const COLORS = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white'
];

export const CODES = COLORS.reduce((accum, color, i) => {
  accum[color] = i;
  return accum;
}, {});

export const colorCode = (color) => {
  return CODES[color];
};

export const decodedValue = (colors) => {
  return parseInt(colors.map(colorCode).join(""), 10);
};

export const value_math = (colors) => {
  return colors.reverse().reduce((accum, color, i) => {
    return accum + (colorCode(color) * (10 ** i));
  }, 0);
};
