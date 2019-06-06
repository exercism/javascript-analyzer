export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
export function value(colorsArray = []) {
    const result = [];
    colorsArray.forEach((color) => {
        result.push(COLORS.indexOf(color));  
    })
    return parseInt(result.join(''));
}