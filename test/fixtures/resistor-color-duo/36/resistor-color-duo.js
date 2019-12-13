var COLORS = ["black", "brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = (colors) =>{
    let color =  colors[0];
    let color2 = colors[1];
    return parseInt(COLORS.indexOf(color).toString() +
    COLORS.indexOf(color2).toString());
}
