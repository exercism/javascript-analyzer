export const COLORS = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white'
];

/**
 * Returns the value of the given `color` on the resister color code.
 *
 * @param {string} color
 *
 * @return {number}
 */
export const colorCode = color => COLORS.indexOf(color.toLowerCase());

/**
 * Returns the resistance value of a resistor with the given `colors`.
 *
 * @param {Array<string>} colors
 *
 * @return {number}
 */
export const value = colors => +colors.map(colorCode).join('');
