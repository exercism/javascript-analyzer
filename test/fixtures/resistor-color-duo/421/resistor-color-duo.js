

 var COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

 export function value([color1,color2]){
    var resistors = arguments[0];
    return Number(`${COLORS.indexOf(resistors[0])}${COLORS.indexOf(resistors[1])}`)
}



