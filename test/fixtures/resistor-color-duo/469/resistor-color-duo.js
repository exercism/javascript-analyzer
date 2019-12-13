export const COLORS = [
    "black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"
];

export function decodedValue(colors_pair){
    return COLORS.indexOf(colors_pair[0]) * 10 + COLORS.indexOf(colors_pair[1]);
}
