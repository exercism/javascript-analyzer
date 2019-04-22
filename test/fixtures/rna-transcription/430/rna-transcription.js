export const toRna = (dna) => {
  return dna.toUpperCase().replace(/(C)|(G)|(A)|(T)|([BD-FHSU-Z])/gi, (match, c, g, a, t, incorrect) => {
    if (c) return 'G';
    if (g) return 'C';
    if (a) return 'U';
    if (t) return 'A';
    if (incorrect) throw new Error('Invalid input DNA.');
  });
};
