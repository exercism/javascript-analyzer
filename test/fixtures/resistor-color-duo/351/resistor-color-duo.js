const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = (colors) => COLORS.indexOf(colors[0]) * 10 + COLORS.indexOf(colors[1]);

