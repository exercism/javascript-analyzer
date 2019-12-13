const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

const colorCode = (color) => {
    return COLORS.indexOf(color);
}

export const decodedValue = (color) => {
    return parseInt(`${colorCode(color[0])}${colorCode(color[1])}`);
}
