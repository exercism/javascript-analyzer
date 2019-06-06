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

export const value = colors => {
  var value1 = COLORS.indexOf(colors[0]);
  var value2 = COLORS.indexOf(colors[1]);

  return parseInt(`${value1}${value2}`);
};
