//resistor-color-duo.js//

const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const addColors = array => {
  return COLORS.indexOf(array[0]) + COLORS.indexOf(array[1]);
}
