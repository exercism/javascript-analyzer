export const value = (colors) => {
    var array = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
    var number = parseInt((String(array.indexOf(colors[0])) + String(array.indexOf(colors[1]))), 10);
    return number;
}