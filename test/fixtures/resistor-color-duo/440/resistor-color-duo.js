const RESISTOR_KEY = {
  black: '0',
  brown: '1',
  red: '2',
  orange: '3',
  yellow: '4',
  green: '5',
  blue: '6',
  violet: '7',
  grey: '8',
  white: '9',
}

export const value = (colors) => {
  const formatColor = colors.map(color => color.toLowerCase());
  const resistorColor = parseInt(RESISTOR_KEY[`${formatColor[0]}`] + RESISTOR_KEY[`${formatColor[1]}`]);
  return resistorColor
};
