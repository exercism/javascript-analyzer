const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
const colorCode = color => COLORS.indexOf(color);
export const value = (colorArray) => {
  let code = colorCode(colorArray[0]).toString() + colorCode(colorArray[1]);
  return Number(code);
};
