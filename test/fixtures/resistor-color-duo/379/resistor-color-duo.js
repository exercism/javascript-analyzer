const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
const colorCode = color => COLORS.indexOf(color.toLowerCase());
export const value = colors => parseInt(colors.map(x => colorCode(x)).join(''));