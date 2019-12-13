
export {decodedValue};

function decodedValue(a) {
    var num = (allcolors.indexOf(a[0])).toString() + (allcolors.indexOf(a[1])).toString();
    return parseInt(num);
    }

const allcolors = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]
