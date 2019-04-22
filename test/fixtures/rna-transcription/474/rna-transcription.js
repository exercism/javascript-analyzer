export const toRna = (dna) => {
    if (new RegExp('[^CGAT]').test(dna)) {
        throw 'Invalid input DNA.';
    }

    let rna = '';

    dna.split('').map(letter => {
        if (letter == 'C') rna += 'G';
        if (letter == 'G') rna += 'C';
        if (letter == 'A') rna += 'U';
        if (letter == 'T') rna += 'A';
    });

    return rna;
}
