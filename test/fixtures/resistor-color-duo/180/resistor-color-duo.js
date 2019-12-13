export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = (colors = [], colorArr = COLORS) => {
    return +colors.map((color) => {
        return colorArr.indexOf(color)
    }).join('')
}
