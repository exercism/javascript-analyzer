export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export function decodedValue(colors) {
  let col1Index = COLORS.indexOf(colors[0].toLowerCase());
  let col2Index = COLORS.indexOf(colors[1].toLowerCase());

  return parseInt(`${col1Index}${col2Index}`);

}
