export const toRna = (nucleotide_string) => {
    if (nucleotide_string.match(/[^CGAT]/)) { throw 'Invalid input DNA.'; }

    const PAIRS = { 'C': 'G', 'G': 'C', 'A': 'U', 'T': 'A' };

    return nucleotide_string.replace(/[CGAT]/g, (match) => { return PAIRS[match]; });
}
