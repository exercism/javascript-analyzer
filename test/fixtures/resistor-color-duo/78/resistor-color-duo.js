const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

// const value = function(colors) {
//   return Number(colors.map(function(color) {
//     return COLORS.indexOf(color)
//    }).join(''));
// }

const value = colors => Number(colors.map(color => COLORS.indexOf(color)).join(''));

export { value };
