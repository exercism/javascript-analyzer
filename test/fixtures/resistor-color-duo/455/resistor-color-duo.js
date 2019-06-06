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

export const value = array => Number(array
  .map(color => COLORS.indexOf(color.toLowerCase()))
  .join('')
);
