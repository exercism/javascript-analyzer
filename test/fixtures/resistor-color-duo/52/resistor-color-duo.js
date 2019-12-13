const BAND_COLORS = [
  'black', 'brown', 'red', 'orange', 'yellow',
  'green', 'blue', 'violet', 'grey', 'white'
];
export const decodedValue = (colors) => colors.reduce( (acc, color, index) => {
  return Math.pow(10, colors.length-1-index) * BAND_COLORS.indexOf(color) + acc;
}, 0);
