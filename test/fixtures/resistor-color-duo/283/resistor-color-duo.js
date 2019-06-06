export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

export function value(colors) {
  return parseInt(colors.reduce((acc, color) => {
    return acc.concat(COLORS.findIndex(el => color === el).toString());
  }, ''));
}

export function value2(colors) {
  return colors.reduce((acc, color, index) => {
    const powerOfTen = colors.length - (index + 1);
    const multiplier = Math.pow(10, powerOfTen);
    const position = COLORS.findIndex((el) => color === el);
    return acc + position * multiplier;
  }, 0);
}
