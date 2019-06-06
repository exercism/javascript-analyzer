const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
export function value(colors) {
    let value="";
    for(let i=0; i<colors.length; i++) {
        value=value + COLORS.indexOf(colors[i]).toString();
    }
    return parseInt(value);
}
