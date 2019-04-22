export const toRna = (rna) => {
    let ret = "";
    if (rna === "")
        return ret;
    for (let i = 0; i < rna.length; i++) {
        if (rna[i] === "G") {
            ret += "C";
        } else if (rna[i] === "C") {
            ret += "G";
        } else if (rna[i] === "T") {
            ret += "A";
        } else if (rna[i] === "A") {
            ret += "U";
        } else {
            throw 'Invalid input DNA.';
        }
    }
    return ret;
}