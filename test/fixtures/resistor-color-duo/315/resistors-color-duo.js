// const colors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
// const value = function (color1, color2) {
//     var value=[];
//     value.push(colors.indexOf(color1));
//     value.push(colors.indexOf(color2));
//     return value.join('');
// };

export const colors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
export const value = function (color) {
    var val=[];
    val.push(colors.indexOf(color[0]));
    val.push(colors.indexOf(color[1]));
    return parseFloat(val.join(''));
};