export function value(resistors) {
  // The value of each resistor color is equal to its index in the array
  const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
  
  return Number(
    COLORS.indexOf(resistors[0]).toString()
    + COLORS.indexOf(resistors[1]).toString()
  );
}