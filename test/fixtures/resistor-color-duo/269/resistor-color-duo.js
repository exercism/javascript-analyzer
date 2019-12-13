
export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

export const colorCode = (color) => {
    return COLORS.indexOf(color)
  };


export const decodedValue = (colors) => {
    let numbers_array = colors.map(colorCode);
    let sum = "";
    for (const item of numbers_array) {
        sum += String(item)
    }
    return parseInt(sum)
}
