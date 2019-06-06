const COLORS = [
         'black',
         'brown',
         'red',
         'orange',
         'yellow',
         'green',
         'blue',
         'violet',
         'grey',
         'white'
];
 
function value([color1, color2]) {
        return Number(COLORS.indexOf(color1.toLowerCase()).toString() + COLORS.indexOf(color2.toLowerCase()).toString());
}
 
export { COLORS, value};
