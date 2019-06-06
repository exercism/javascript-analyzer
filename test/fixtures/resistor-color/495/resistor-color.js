export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

export function colorCode(c) {
    for (var i=0; i<10; i++) {
        if (COLORS[i] === c) {
            return i
        }
    }
}
