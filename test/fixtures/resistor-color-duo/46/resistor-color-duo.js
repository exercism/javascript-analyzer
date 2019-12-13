export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
export const decodedValue = (colors) => {
    var result = "";
    for (var i = 0, l = colors.length; i < l; i++) {
        result += COLORS.indexOf(colors[i]);
    }
    return parseInt(result);
};
