export const toRna = dnaStrand => {
    if (/[^GCTA]/.test(dnaStrand)) throw Error('Invalid input DNA.')
    const complements = new Map([
        ['G', 'C'],
        ['C', 'G'],
        ['T', 'A'],
        ['A', 'U']
    ]);
    let rnaStrand = [...dnaStrand];
    complements.forEach((val, key) => {
        [...dnaStrand].forEach((el, ind) => {
            if (el === key) rnaStrand[ind] = val;
        });
    });
    return rnaStrand.join('')
};