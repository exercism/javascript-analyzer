const nucleotides = [
    ['G', 'C'],
    ['C', 'G'],
    ['T', 'A'],
    ['A', 'U']
];

const isDNA = element => {
    const found = nucleotides.find(([dNuc, _]) => 
        dNuc === element);
    if (!found) throw new Error('Invalid input DNA.');
    return found[1];
}

export const toRna = (dna) => {
    if (!dna) return '';

    return Array.from(dna)
        .map(isDNA)
        .join('');
}