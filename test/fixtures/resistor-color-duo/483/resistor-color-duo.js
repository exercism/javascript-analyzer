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

export const colorCode = color => {
  return COLORS.findIndex(element => element === color);
};

export const value = (colsArr) => {
  let code = '';
  colsArr.forEach(element => {
    code += colorCode(element);
  });
  return Number(code);
}

