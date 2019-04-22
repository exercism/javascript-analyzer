export function toRna(str) {
    let rna = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i]=== 'G') {
            rna += 'C'
        } else if (str[i]==='C') {
            rna += 'G';
        } else if (str[i]==='T') {
            rna += 'A';
        } else if (str[i]==='A') {
            rna += 'U'
        } else {
            throw new Error("Invalid input DNA.");
        }
    }
    return rna;
}