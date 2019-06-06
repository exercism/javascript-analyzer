export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const value = (colorDuoString) => {
  return (COLORS.indexOf(colorDuoString[0]) * 10) +
          COLORS.indexOf(colorDuoString[1]);

};
