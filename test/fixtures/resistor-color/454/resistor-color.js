var COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

function colorCode(color){
    return COLORS.indexOf(color.toLowerCase());
}

export{colorCode, COLORS}