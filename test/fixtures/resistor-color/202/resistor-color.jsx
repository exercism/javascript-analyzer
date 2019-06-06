export const COLORS = ["Black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const colorCode = (value) => {
  COLORS.forEach((color, index) => {
    if (color === value) {
      return index
    }
  });
};

colorCode('black');