const colorValues = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

const decodedValue => color => colorValues.indexOf(color)

export const decodedValue = (colors) =>
    colors.reduce((sum, color, index) => sum + decodedValue(color) * Math.pow(10, colors.length - index - 1), 0)


