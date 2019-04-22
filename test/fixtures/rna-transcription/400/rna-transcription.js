export const toRna = (seq) => {
  const rnaMap = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
 };
    if (/[^GCTA]/.test(seq)) {
        throw new Error('Invalid input DNA.');
    }
        return seq.split('').map(x => rnaMap[x]).join('');
};
