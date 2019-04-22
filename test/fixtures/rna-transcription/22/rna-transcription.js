export const toRna = (dna) => {
    const map = new Map([["G", "C"], ["C", "G"], ["T", "A"], ["A", "U"]]);
    let rna = ''
    if (dna === '') {
        return rna
    }

    [...dna].forEach(function (char) {
        let rchar = map.get(char);
        if (rchar === undefined) {
            throw new Error('Invalid input DNA.');
        }
        rna += rchar;
    });
    return rna;
}