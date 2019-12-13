
export const COLORS = [
    'black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet',
    'grey', 'white',
  ];
  export function decodedValue(colors) {
    return Number(`${COLORS.indexOf(colors[0])}${COLORS.indexOf(colors[1])}`)
  }
