export const colorCode = color => {
  return COLORS.indexOf(color);
};

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
  'white',
];

export const decodedValue = colors => {
  return colors.reduce((acc, color) => {
    return 10 * acc + colorCode(color);
  }, 0);
};
