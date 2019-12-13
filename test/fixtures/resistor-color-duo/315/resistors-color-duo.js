// const colors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
// const decodedValue = function (color1, color2) {
//     var decodedValue=[];
//     decodedValue.push(colors.indexOf(color1));
//     decodedValue.push(colors.indexOf(color2));
//     return decodedValue.join('');
// };

export const colors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
export const decodedValue = function (color) {
    var val=[];
    val.push(colors.indexOf(color[0]));
    val.push(colors.indexOf(color[1]));
    return parseFloat(val.join(''));
};
