const nucleotideComplement = {
    'G' : 'C',
    'C' : 'G',
    'T' : 'A',
    'A' : 'U'
};

export const toRna = (strand) => {
    return strand.replace(/./g, nucleotide => {
        const complement = nucleotideComplement[nucleotide];
        if (!complement) throw 'Invalid input DNA.';
        return complement;
    });
};
