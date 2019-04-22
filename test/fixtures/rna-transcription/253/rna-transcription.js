// * `G` -> `C`
// * `C` -> `G`
// * `T` -> `A`
// * `A` -> `U`


export const toRna =  (input) => {
    function strReplace() {
        var myStr = input;
        if (input ="") {
            return newStr = "";
        } else return newStr = myStr.replace((/G/gi, "C"), (/C/gi, "G"), (/T/gi, "A"), (/A/gi, "U"));
    }
}