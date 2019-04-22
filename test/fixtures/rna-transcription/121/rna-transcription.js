export const toRna = (fromDna) => {
    if (typeof fromDna !== 'string')
        throw new Error('Expected DNA string.');
    const dnaStrand = fromDna.toUpperCase();
    let rnaStrand = '';
    const convert = {
        G: 'C',
        C: 'G',
        T: 'A',
        A: 'U'
    };
    for (let nucleotides = 0; nucleotides < dnaStrand.length; nucleotides += 1) {
        if(convert[dnaStrand[nucleotides]]){
            rnaStrand += convert[dnaStrand[nucleotides]];
        } else {
            throw new Error('Invalid input DNA.');
        }
    }
    return rnaStrand;
};
