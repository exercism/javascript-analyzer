export let COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

export function decodedValue(color) {
    return +(COLORS.indexOf(color[0]) + '' + COLORS.indexOf(color[1]));
}
