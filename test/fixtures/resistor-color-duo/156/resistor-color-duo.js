export function decodedValue(resistorColors) {
    let ret = "";
    resistorColors.forEach(function(color) {
        ret += COLORS.indexOf(color);
    });
    return Number(ret);
}

const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

