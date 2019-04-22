export const toRna = (dnaStrand) => {
    return dnaStrand.split('')
    .map(_dnaToRnaMapping)
    .join('');
};

const _mapping = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
};

const _dnaToRnaMapping = (dna) => {
    const mapped = _mapping[dna];

    if (mapped) {
        return mapped;
    }

    throw new Error('Invalid input DNA.');
};
