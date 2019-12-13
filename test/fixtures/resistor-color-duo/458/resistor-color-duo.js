export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

export const decodedValue = code => parseInt(`${COLORS.indexOf(code[0])}${COLORS.indexOf(code[1])}`)
