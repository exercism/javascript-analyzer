const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
const colorCode = color => COLORS.indexOf(color);

export function value(ar){
    return colorCode(ar[0]) * 10 + colorCode(ar[1]);
}