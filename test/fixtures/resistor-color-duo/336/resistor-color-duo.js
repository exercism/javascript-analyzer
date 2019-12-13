const RESISTOR_VALUES = {
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

const reverse = array =>
  array.reduce((result, current) => [current, ...result], []);
const place = index => 10 ** index;

const resistance = color => RESISTOR_VALUES[color];
const placeValue = (color, index) => resistance(color) * place(index);

const totalResistance = colors =>
  reverse(colors).reduce(
    (total, color, index) => total + placeValue(color, index),
    0
  );

export const decodedValue = totalResistance;
