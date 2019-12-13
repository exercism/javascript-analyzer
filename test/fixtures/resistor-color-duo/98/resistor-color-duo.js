export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

export const decodedValue = ([a, b]) => {
    return parseInt(String(COLORS.indexOf(a.toLowerCase())) + String(COLORS.indexOf(b.toLowerCase())))
}
