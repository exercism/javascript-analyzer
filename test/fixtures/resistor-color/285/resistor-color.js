
export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
const colorCodeObj = {};
/*
    Return color code of resistance band
    @param color : name of the color
    @return colorCode: integer
*/
export const colorCode = (color) => {
    color = color.toLowerCase();
    if(colorCodeObj.hasOwnProperty(color)) {
        return colorCodeObj[color];
    }
    let index = COLORS.indexOf(color);
    if(index > -1) {
        colorCodeObj[color] = index;
        return index;
    } else {
        return -1;
    }
}