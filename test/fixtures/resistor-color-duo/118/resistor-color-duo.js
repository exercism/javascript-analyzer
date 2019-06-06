export var COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const colorCode = color => COLORS.indexOf(color);

export const value = ([color1, color2]) => COLORS.indexOf(color1)*10 + COLORS.indexOf(color2)