export const toRna = (dna) => {
    const nucleo = {G : 'C',C : 'G', T : 'A', A : 'U'}
    let dnaArray = dna.split('');
    let rna = '';
    dnaArray.map((n) => {
        if(n == 'G' || n == 'C' || n == 'T' || n == 'A'){
            rna = `${rna}${nucleo[n]}`;
        } else {
            throw new Error('Invalid input DNA.');
        }
    });

    return rna;
}

console.log(toRna('C'));