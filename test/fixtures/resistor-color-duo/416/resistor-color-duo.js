export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const colorCode = (color) => {
    return COLORS.indexOf(color);
};

export const value = (colors) => {
    let output = '';
    for (let color of colors) {
        output = output + COLORS.indexOf(color);
    }
    return parseInt(output);
}