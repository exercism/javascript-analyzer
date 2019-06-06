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

export const value = inputColors => {
  let result = '';

  inputColors.map(color => {
    result += COLORS.indexOf(color);
  });

  return parseInt(result, 10);
};
