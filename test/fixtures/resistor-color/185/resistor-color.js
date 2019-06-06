const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

const colorCode = (color) => {
  for (let i = 0; i < COLORS.length; i++) {
    if (COLORS[i] === color) {
      return i;
    }
  }
}

module.exports.COLORS = COLORS;
module.exports.colorCode = colorCode;
