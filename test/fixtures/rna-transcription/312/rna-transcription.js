const complements = {G: 'C', C: 'G', T: 'A', A: 'U'};
const eachNucleotide = /./g;
const withItsComplement = (nucleotide) => {
  if (!nucleotide.match(/[ACGT]/)) {
    throw new Error('Invalid input DNA.');
  }
  return complements[nucleotide];
};

export const toRna = dna => dna.replace(eachNucleotide, withItsComplement);
