export var COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export function decodedValue([firstColor, secondColor]) {
    var color1 = COLORS.indexOf(firstColor)
    var color2 = COLORS.indexOf(secondColor)
    const result = `${color1}${color2}`
    return parseInt(result)
}
