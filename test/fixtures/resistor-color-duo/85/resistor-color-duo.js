const colorValues = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

const value => color => colorValues.indexOf(color)

export const value = (colors) => 
    colors.reduce((sum, color, index) => sum + value(color) * Math.pow(10, colors.length - index - 1), 0)


