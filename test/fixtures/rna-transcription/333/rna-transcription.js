export function toRna(Dna) {
  let i;
  let retVal = '';
  const validInputs = ['A', 'C', 'G', 'T'];
  const replacements = ['U', 'G', 'C', 'A'];

  for (i = 0; i < Dna.length; i += 1) {
    const nucleotide = Dna.charAt(i);
    if (validInputs.includes(nucleotide)) {
      retVal += replacements[validInputs.indexOf(nucleotide)];
    } else {
      throw new Error('Invalid input DNA.');
    }
  }

  return retVal;
}
