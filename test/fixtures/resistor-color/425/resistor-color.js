
function ResistorColor (color) {
    if (!color) return "please, specify a color";
    var colorCode = ["black" ,"brown" ,"red" , "Orange" , "yellow" , "green" , "blue" , "violet" , "grey" , "white"]
    for ( var i = 0 ; i <=9 ; i++){
        if (color === colorCode[i]) {
            return i;
        }
    }
}
ResistorColor("black");