const COLORS=[
    "black", 
    "brown", 
    "red", 
    "orange",
    "yellow",
    "green",
    "blue",
    "violet",
    "grey",
    "white"];

function colorCode(color){
    if (color!==undefined)
        return COLORS.indexOf(color);
    else
        return COLORS;
}

export {COLORS, colorCode};