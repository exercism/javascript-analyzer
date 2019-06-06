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
