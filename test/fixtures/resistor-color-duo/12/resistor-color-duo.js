const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

const decodedValue = (colors) => {
    return COLORS.indexOf(colors[0]) + COLORS.indexOf(colors[1]);
};

export { decodedValue };
