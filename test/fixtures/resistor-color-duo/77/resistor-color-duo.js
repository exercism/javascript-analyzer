export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

export const value = (colors) => {
    var numbers = []
    for (var i = 0; i < colors.length; i++)
        numbers.push(COLORS.indexOf(colors[i]).toString())

    return Number(numbers.join(''))
}