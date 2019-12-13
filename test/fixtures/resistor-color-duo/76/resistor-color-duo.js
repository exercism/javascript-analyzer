export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const colorCode = ( color ) => COLORS.indexOf(color);

export function decodedValue(input) {
  return parseInt(input.map(el => colorCode(el)).join(''), 10);
}
