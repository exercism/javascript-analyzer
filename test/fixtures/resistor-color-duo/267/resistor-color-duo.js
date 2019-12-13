// Convert Resistor Color input sequence to numeric decodedValue.
// Note:  this function supports an arbitrary number of input colors.
// input:  list with one or more colors, as strings.
// output:  single integer decodedValue representing the colors
//     specified in the input string.
// example:  decodedValue(['red', 'blue']), yields:  26

const colors =
   ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']

export const decodedValue = (input_colors) => {
  if (! input_colors || input_colors.length == 0) {
     throw Error("Invalid input: minimum number of colors is one.");
  }
  const num_colors = input_colors.length;
  let output = 0;
  // process input from right to left
  let position_factor = 1;
  for (var k=num_colors-1; k>=0; k--) {
     let color_value = colors.indexOf(input_colors[k].toLowerCase()) * position_factor;
     output += color_value;
     position_factor *= 10;
  }
  return output;
}
