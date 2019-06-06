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

const colorCode = color => COLORS.reduce((acc, value, index) => (
  {
    ...acc,
    [value]: index,
  }
), {})[color];

module.exports = {
  colorCode,
  COLORS,
}