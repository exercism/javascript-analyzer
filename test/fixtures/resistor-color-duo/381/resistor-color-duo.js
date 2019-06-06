export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

export const colorCode = (color) => COLORS.indexOf(color)

export const value = (color_array) => 10 * colorCode(color_array[0]) + colorCode(color_array[1])
