var COLORS = [
    "black",
    "brown",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "violet",
    "grey",
    "white"
]

function colorCode(color){
    return COLORS.findIndex(colorItem => colorItem === color);
}

module.exports =  {
colorCode,
COLORS
}