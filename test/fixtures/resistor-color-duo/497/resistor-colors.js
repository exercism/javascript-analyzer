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

export function value(colors) {
  return +colors
    .map(color => COLORS.indexOf(color))
    .join('');
}
