const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
const value = (arr = []) => {
    let str = "";
    arr.forEach((el) => {str += COLORS.indexOf(el)});
    return Number(str);
}

export { COLORS, value }