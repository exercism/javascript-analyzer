export const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

export function value(resistorColors) {
  return parseInt(COLORS.indexOf(resistorColors[0]).toString() + COLORS.indexOf(resistorColors[1]).toString());
}

