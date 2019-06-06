const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

// const colorCode = (requestedColor) => {
//   var returnedIndex = -1;
//   COLORS.forEach(function(color, index){
//     if (requestedColor === color) {
//       returnedIndex = index
//     }
//   });
//   return returnedIndex;
// };

const colorCode = (requestedColor) => {
  for (var x = 0; x <= COLORS.length; x += 1) {
    if (COLORS[x] === requestedColor) {
      return x;
    }
  }
  return -1;
};



module.exports = {
  colorCode,
  COLORS,
};




