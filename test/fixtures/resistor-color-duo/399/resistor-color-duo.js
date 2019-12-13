const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
export function decodedValue(colors) {
    let decodedValue="";
    for(let i=0; i<colors.length; i++) {
        decodedValue=decodedValue + COLORS.indexOf(colors[i]).toString();
    }
    return parseInt(decodedValue);
}
