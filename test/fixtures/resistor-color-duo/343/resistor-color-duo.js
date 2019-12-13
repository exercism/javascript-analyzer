export const decodedValue = function(colors) {
  const colorArray = Array.from(colors);
  const resultAsString = colorArray.reduce((previous, current) => {
    if (previous) {
      return previous + COLORS.indexOf(current).toString();
    }
    return COLORS.indexOf(current).toString();
  }, null);

  return parseInt(resultAsString);
};
const COLORS = [
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

