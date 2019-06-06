const COLORS = {
  black:  '0',
  brown:  '1',
  red:    '2',
  orange: '3',
  yellow: '4',
  green:  '5',
  blue:   '6',
  violet: '7',
  grey:   '8',
  white:  '9'
};

const value = ([digit1, digit2]) => {
  return Number(`${COLORS[digit1]}${COLORS[digit2]}`)
};

export { COLORS, value };
