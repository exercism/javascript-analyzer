const MAP = {
    C: 'G',
    G: 'C',
    T: 'A',
    A: 'U',
};
  
export const toRna = (sequence) => {
    const rna = sequence.replace(/./g, ntide => MAP[ntide]);
    if (rna.length !== sequence.length) {
        throw new Error('Invalid input DNA.');
    } else {
        return rna;
    }
};