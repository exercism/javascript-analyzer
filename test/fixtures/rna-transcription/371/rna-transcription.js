export const toRna = (seq) => {
    var res = "";
    Array.from(seq).map(function(e) {
        switch(e) {
            case "G":
                res += "C";
                break;
            case "C":
                res += "G";
                break;
            case "T":
                res += "A";
                break;
            case "A":
                res += "U";
                break;
            default:
                throw new Error('Invalid input DNA.');
        }
    });
    return res;
};