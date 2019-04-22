const characters = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export const toRna = dna => dna.replace(
  /(.{1})/g,
  character => characters[character] || ((() => { throw new Error('Invalid input DNA.'); })()),
);
