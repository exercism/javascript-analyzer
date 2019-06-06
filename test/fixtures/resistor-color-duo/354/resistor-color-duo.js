var COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
export function value(colorArray) {
    return + colorArray.map(color => COLORS.indexOf(color)).join('')
}