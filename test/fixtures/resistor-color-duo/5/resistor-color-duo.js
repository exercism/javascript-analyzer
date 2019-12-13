const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

export const decodedValue = (colors) => {
    let tens = COLORS.indexOf(colors[0])
    let ones = COLORS.indexOf(colors[1])
    return tens * 10 + ones
}
