var COLORS = [
      "black"
    , "brown"
    , "red"
    , "orange"
    , "yellow"
    , "green"
    , "blue"
    , "violet"
    , "grey"
    , "white"
]

function colorCode(color) {
    return COLORS.indexOf(color);
}

function decodedValue(colors) {
    var result = "";
    for (var i in colors ) {
        result += colorCode(colors[i]);
    }
    return parseInt(result);
}
export { decodedValue }
