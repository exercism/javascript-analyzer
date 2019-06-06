export const COLORS = {
  Black: '0',
  Brown: '1',
  Red: '2',
  Orange: '3',
  Yellow: '4',
  Green: '5',
  Blue: '6',
  Violet: '7',
  Grey: '8',
  White: '9'
}

export function value(color1, color2) {
  let colorsSum = COLORS[color1] + COLORS[color2];
  return Number.parseInt(colorsSum);
}
