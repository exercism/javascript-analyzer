const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const value = (colors) => {
    return parseInt(colorCode(colors[0]) + "" + colorCode(colors[1]));
};

const colorCode = (code) => COLORS.indexOf(code);