const mappingColors = {
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


export const value = (colors) => {
  let color1 = mappingColors[colors[0]];
  let color2 = mappingColors[colors[1]];
  const result = `${color1}${color2}`;

  return parseInt(result)
};