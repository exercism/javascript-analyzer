export function value([color1, color2]) {
    var colors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
    var resistor = colors.indexOf(color1).toString() + colors.indexOf(color2).toString();
    return parseInt(resistor);
}