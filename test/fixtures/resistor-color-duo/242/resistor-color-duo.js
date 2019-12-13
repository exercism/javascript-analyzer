export var COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

export function colorCode(theColor){
    return COLORS.indexOf(theColor);
}

export function decodedValue(colors){
    return colorCode(colors[0]) * 10 + colorCode(colors[1]);
}
