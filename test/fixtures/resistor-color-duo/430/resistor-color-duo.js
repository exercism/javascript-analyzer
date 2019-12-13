var COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"] ;

export function decodedValue(colorArr) {
    var val = "";

    colorArr.forEach(function(element) {
        val = val + COLORS.indexOf(element);
    });

    return parseInt(val, 10);
}
