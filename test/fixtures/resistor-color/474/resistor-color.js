export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

export const colorCode = (color) => {
  console.log(COLORS);
  return COLORS.indexOf(color);
}

console.log(colorCode('black'));