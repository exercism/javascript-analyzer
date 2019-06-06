const bandColorsValues = {
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
};

const value = arr => {
  return Number(`${bandColorsValues[arr[0]]}${bandColorsValues[arr[1]]}`);
};

export { value };
