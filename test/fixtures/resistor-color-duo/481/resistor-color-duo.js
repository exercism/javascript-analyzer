const colourNumberMap = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9
}

export const value = (colours)=> {
  let result = '';

  colours.forEach(colour => {
    result += colourNumberMap[colour];
  });

  return parseInt(result);
}