export const value = (color) => {

    let colorArr = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

    let resistance = String(colorArr.indexOf(color[0])) + String(colorArr.indexOf(color[1]));

    return Number(resistance);

}