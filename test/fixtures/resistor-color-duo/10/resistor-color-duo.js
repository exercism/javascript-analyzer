export function value(input) {
    const colors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
    return parseInt(colors.indexOf(input[0]).toString() + colors.indexOf(input[1]).toString());
};