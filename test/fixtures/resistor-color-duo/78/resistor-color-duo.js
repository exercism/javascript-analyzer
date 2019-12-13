const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];

// const decodedValue = function(colors) {
//   return Number(colors.map(function(color) {
//     return COLORS.indexOf(color)
//    }).join(''));
// }

const decodedValue = colors => Number(colors.map(color => COLORS.indexOf(color)).join(''));

export { decodedValue };
