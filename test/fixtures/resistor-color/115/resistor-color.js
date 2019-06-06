/*
 * Simple mapping resistors colors to numbers 
 */

// Defining colors in order
export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", 
                       "blue", "violet", "grey", "white"];

// Function to return index of a specific color
export function colorCode(color) {
  return COLORS.indexOf(color);
}
