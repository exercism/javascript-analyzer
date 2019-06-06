const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

let colorCode = (color) => {
   return COLORS.findIndex(checkColor(color));
}

let checkColor = (color) => {
    return (elem) => elem === color;
 }

export {colorCode, COLORS};

