export const toRna = (dna) => {
    if(dna.length < 1) return "";

    if (/[^ACGT]/.test(dna)) {
        throw Error('Invalid input DNA.')
    }
    const G = dna.replace(/C/g, 'g')
    const C = G.replace(/G/g, 'c')

    const A = C.replace(/A/g, 'u');
    const T = A.replace(/T/g, 'a')
    const rna = T.toUpperCase()
    return rna;
}

/*

transcript dna to rna
G -> C
C -> G
T -> A
A -> U

*/