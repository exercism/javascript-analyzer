const resistorObj = {
  black: '0',
  brown: '1',
  red: '2',
  orange: '3',
  yellow: '4',
  green: '5',
  blue: '6',
  violet: '7',
  grey: '8',
  white: '9'
};

/*
const decodedValue = colors => {
  const resistanceValue = colors
        .map(x => resistorObj[x])
        .reduce((total, current) => total + current);
    return parseInt(resistanceValue);
}
*/

const decodedValue = colors => parseInt(resistorObj[colors[0]] + resistorObj[colors[1]]);

export { decodedValue };
