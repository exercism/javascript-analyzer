// reuse the "resistor color" exercise
export const COLORS = [
  'black', 'brown', 'red', 'orange', 'yellow',
  'green', 'blue', 'violet', 'grey', 'white',
];

const colorCode = color => {
  const idx = COLORS.indexOf(color);
  if (idx > -1) return idx;
  throw new Error('Invalid color: ' + color);
};

export const decodedValue = (colors) => {
  return colors
    .slice(0,2)
    .map(color => colorCode(color))
    .reduce((val, code) => val * 10 + code, 0);
};
