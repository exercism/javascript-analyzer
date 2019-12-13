
export const decodedValue = (values) => {
    var v = '';
    var colors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
    for (let i = 0; i <= colors.length; i++) {
        if (values[0] == colors[i]) {

            v += colors.indexOf(colors[i]);

        } else if (values[1] == colors[i]) {

            v += colors.indexOf(colors[i]);

        }

    }

   if( parseInt(v) <= 9 ){
    return parseInt(v) *11;
   }
    return parseInt(v);

}
