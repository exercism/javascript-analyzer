export const COLORS=["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

export function colorCode(color) {
    for(let i = 0; i < COLORS.length; i++) {
        if (color === COLORS[i]) {
            return i
        }
    }
    
    return -1
}