export function toRna(str) {
    if (str.length === 0) {return ''}
    var arrOfChar = str.split('')
    var validChar = ['G', 'C', 'T', 'A']
    var newArr = []
    for (var i = 0; i < arrOfChar.length; i++) {
        if (validChar.includes(arrOfChar[i])) {
            if (arrOfChar[i] === "G") {
                newArr.push("C");
            } else if (arrOfChar[i] === "C") {
                newArr.push("G");
            } else if (arrOfChar[i] === "T") {
                newArr.push("A");
            } else if (arrOfChar[i] === "A") {
                newArr.push("U");
            }
        } else {
            throw "Invalid input DNA."
        }
    }
    return newArr.join('');
}