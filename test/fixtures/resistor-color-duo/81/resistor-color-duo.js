export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
export const colorCode = ColorStr => COLORS.indexOf(ColorStr);
export const decodedValue = ColorsStrArray => 10*colorCode(ColorsStrArray[0])+colorCode(ColorsStrArray[1]);
