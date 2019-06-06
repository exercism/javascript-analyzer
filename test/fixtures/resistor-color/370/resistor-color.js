const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]
const colorCode = (color) => {
    
    return COLORS.indexOf(color);
}

module.exports = { colorCode, COLORS }

