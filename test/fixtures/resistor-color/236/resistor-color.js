export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const colorCode = (color = '', colorArr = COLORS) => {
    return colorArr.indexOf(color);
}