const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = (color) => {
  return parseInt(COLORS.indexOf(color[0]) + '' + COLORS.indexOf(color[1]));
}
