export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
export const colorCode = ColorStr => COLORS.indexOf(ColorStr);
export const value = ColorsStrArray => 10*colorCode(ColorsStrArray[0])+colorCode(ColorsStrArray[1]);