export const toRna = (stringInput) => {
    let string = stringInput.toUpperCase();
    for (let i = 0; i < string.length; i++) {
        if (string[i] !== "G" || string[i] !== "C" || string[i] !== "T" || string[i] !== "A" || string[i] !== " ") {
            return new Error('Invalid input DNA.');
        }
    }
    let result = "";
    for (let i = 0; i < string.length; i++) {
        switch (string[i]) {
            case "G":
                result += "C";
                break;
            case "C":
                result += "G";
                break;
            case "T":
                result += "A";
                break;
            case "A":
                result += "U";
                break;
            default:
                result += " ";
                break
        }
    }
    return result;
}

console.log(toRna(" "));
console.log(toRna("C"));
console.log(toRna("G"));
console.log(toRna("A"));
console.log(toRna("T"));
console.log(toRna("ACGTGGTCTTAA"));
console.log(toRna("U"));
console.log(toRna("U"));
console.log(toRna("XXX"));
console.log(toRna("ACGTXXXCTTAA"));