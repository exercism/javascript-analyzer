export const toRna = (dna) => {
  if (/^[G|C|T|A]+$/.test(dna)) {
    const rna = dna.replace(/G|C|T|A/gi, (char) => {
      const transcribe = {
        G: 'C',
        C: 'G',
        T: 'A',
        A: 'U',
      };
      return transcribe[char];
    });
    return rna;
  }
  return dna === ''
    ? dna
    : (() => {
      throw new Error('Invalid input DNA.');
    })();
};
