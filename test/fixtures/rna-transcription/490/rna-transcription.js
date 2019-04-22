export const toRna = (dnas) => {
    let Rna = '';
    dnas.split('').map((dna) => {
        switch (dna) {
            case 'G':
                Rna += 'C';
                break
            case 'C':
                Rna += 'G';
                break
            case 'T':
                Rna += 'A';
                break
            case 'A':
                Rna += 'U';
                break
        }
    });
    return Rna;
}
