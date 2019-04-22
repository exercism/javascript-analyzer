
export const toRna = (dnaString) => {
    const dna = dnaString.split('');        
    const rna = dna.map(x => translate(x));   
    
    return rna.join('');
}

const translate = (nucleotide ) => {
    if (nucleotide === 'G') return 'C';
    else if (nucleotide === 'C') return 'G';
    else if (nucleotide === 'T') return 'A';
    else if (nucleotide === 'A') return 'U';
    else throw Error('Invalid input DNA.');

}