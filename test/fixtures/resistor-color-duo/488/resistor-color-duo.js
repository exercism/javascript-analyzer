/**
 * module resistor-color-duo provides helpful function to handle with
 * Raspiberry PI resistors.
 */
const COLORS = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white"
];

/**
 * Calculate the value of the band from two resistor colors
 *
 * @param {string[]} colors - A list of resistor colors
 * @returns {number} The value of the band
 *
 * @example
 *  value(["brown", "black"]) #=> 10
 */
export function value(colors) {
  return Number.parseInt(
    colors.reduce((result, color) => result + COLORS.indexOf(color), ""),
    10
  );
}
