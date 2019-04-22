export const toRna = (dna) => {
    if (dna.match(/[^ATCG]/gi)) throw 'Invalid input DNA.';
    return dna.toLowerCase().replace(/g/g,'C').replace(/c/g,'G').replace(/t/g,'A').replace(/a/g,'U');
};