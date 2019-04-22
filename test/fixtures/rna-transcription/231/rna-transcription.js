export const toRna = (dna) => {
    const complements = {
        'G':'C',
        'C':'G',
        'T':'A',
        'A':'U',
    };
    return dna.split('').map((nucleotide) => {
        const transcribed = complements[nucleotide];
        if (!transcribed) throw new Error('Invalid input DNA.');
        return transcribed;
    }).join('');
}
