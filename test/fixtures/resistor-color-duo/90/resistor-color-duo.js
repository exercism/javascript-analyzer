const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

const colorCode = (color) => {
    return COLORS.indexOf(color);
}

export const decodedValue = (array) => {
    const concatenate = "" + colorCode(array[0]) + colorCode(array[1])
    return parseInt(concatenate, 10)
}
