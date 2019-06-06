export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

export function colorCode(color){
    if (COLORS.includes(color)){
        return COLORS.indexOf(color)
    }
    return -1
}