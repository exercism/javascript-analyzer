export const toRna = (dna) => {
    let rna = dna
    let patt = /[^acgt]/gi
    let result = dna.match(patt)
    
    if(result) {
        throw new Error('Invalid input DNA.')
    }

    rna = rna.replace(/A/g, 'U')
    rna = rna.replace(/T/g, 'A')
    rna = rna.replace(/G/g, 'x')
    rna = rna.replace(/C/g, 'G')
    rna = rna.replace(/x/g, 'C')

    return rna;
}