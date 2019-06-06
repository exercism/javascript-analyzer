const lookup = {
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
}

export const value = (bands = []) => {
  return bands.reduce((number, band) => {
    const nextDigit = lookup[band];
    return Number('' + number + nextDigit);
  }, '');
}