export const toRna = (sequence) => {
  if (/[^CGAT]/.test(sequence)) throw Error('Invalid input DNA.');
  return sequence.replace(
    /./g,
    nucleotide => ({
      C: 'G',
      G: 'C',
      A: 'U',
      T: 'A',
    }[nucleotide]),
  );
};
