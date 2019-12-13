export const COLORS = [ "black","brown","red","orange","yellow","green","blue","violet","grey","white"]
export const colorCode = (color) => {
    return COLORS.indexOf(color)
}

export const decodedValue = (code) => {
    return Number(colorCode(code[0]).toString() + colorCode(code[1]).toString())
}

