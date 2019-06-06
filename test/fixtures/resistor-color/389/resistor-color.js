
const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

module.exports = {
    COLORS,

    colorCode(color) {
        return COLORS.indexOf(color)
    }
}
