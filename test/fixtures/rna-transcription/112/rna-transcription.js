export const toRna = (str) => {
    var str1 = [];
    let i = 0;
    for (; i < str.length; i++) {
        switch (str[i]) {
            case "":
                return str1 = "";
            case "C":
                str1[i] = "G";
                break;
            case "G":
                str1[i] = "C";
                break;
            case "A":
                str1[i] = "U";
                break;
            case "T":
                str1[i] = "A";
                break;
            default:
                throw new Error('Invalid input DNA.');
        }
    }
    return str1.join('');
}
