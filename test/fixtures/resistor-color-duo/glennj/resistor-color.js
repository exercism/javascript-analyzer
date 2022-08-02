export const COLORS = [
  'black', 'brown', 'red', 'orange', 'yellow',
  'green', 'blue', 'violet', 'grey', 'white',
];
export const colorCode = color => {
  const idx = COLORS.indexOf(color);
  if (idx > -1) return idx;
  throw new Error('Invalid color: ' + color);
};
