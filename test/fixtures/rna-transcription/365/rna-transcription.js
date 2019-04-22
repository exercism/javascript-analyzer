const toRna = (dna) => {
    if (!dna) return '';
    const conversion = {
        'G': 'C',
        'C': 'G',
        'T': 'A',
        'A': 'U'};

    if (dna.match(/[^GCTA]/)) throw('Invalid input DNA.');

    return Array.from(dna, n => conversion[n]).join("");
};

export {toRna};
