const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export const decodedValue = (colors) => {
    return parseInt(''.concat(String(COLORS.findIndex(color => color===colors[0])), String(COLORS.findIndex(color => color===colors[1]))));
};
