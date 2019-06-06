export const colorCode = (x) => {
    const ColorSearch = (element) => {
        return (element === x);
    }
    return COLORS.findIndex(ColorSearch);
}

export const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

//export default {
//    COLORS,
//     colorCode,
// }