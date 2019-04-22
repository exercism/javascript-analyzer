const toRna = sequence => {
    return sequence.split('')
        .map(dnaNucleotide => {
            const rnaNucleotide = dnaNucleotide === 'G' ? 'C' :
                dnaNucleotide === 'C' ? 'G' :
                dnaNucleotide === 'T' ? 'A' :
                dnaNucleotide === 'A' ? 'U' : null;
            if(rnaNucleotide === null) {
                throw new Error('Invalid input DNA.');
            }
            return rnaNucleotide;
        })
        .join('')
};

export {
    toRna
};