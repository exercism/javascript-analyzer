const DNA_TO_RNA_MAP = { G: 'C', C: 'G', T: 'A', A: 'U' };

export const toRna = (sequence) => {
    return sequence.split('').map(nucleotide => {
        if (DNA_TO_RNA_MAP[nucleotide] === undefined) {
            throw new Error("Invalid input DNA.");
        }
        return DNA_TO_RNA_MAP[nucleotide];
    }).join('');
}
