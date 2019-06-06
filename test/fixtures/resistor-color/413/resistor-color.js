const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"],
  colorCode = (color) => {
    for(let index = 0; index < COLORS.length; index++){
      if(COLORS[index] === color) {
        return index;
      }
    }
    return -1
  }
  //Original solution used findIndex but that felt like cheating

module.exports = {
  COLORS,
  colorCode
}

