const colorMap = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
};

function value(colorNameList) {
  const accNumbers = colorNameList
    .map((colorName) => {
      return colorMap[colorName];
    })
    .join('');
  return parseInt(accNumbers);
}

export { value };
