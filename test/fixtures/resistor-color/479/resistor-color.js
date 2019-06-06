export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

export function colorCode(colour){
    if (COLORS.includes(colour)){
        return COLORS.indexOf(colour)
    }
    return -1
}