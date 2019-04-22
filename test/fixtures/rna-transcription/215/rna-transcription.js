export const toRna = (dna) => {
  let rna = "";
  for (const dna_nucleotide of dna) {
    rna += transcribe(dna_nucleotide);
  }
  return rna;
};

const transcriptions = new Map([['G', 'C'], ['C', 'G'], ['T', 'A'], ['A', 'U']]);

const transcribe = (dna_nucleotide) => {
  let rna_nucleotide = transcriptions.get(dna_nucleotide);
  if (rna_nucleotide === undefined) {
    throw new Error('Invalid input DNA.');
  }
  return rna_nucleotide;
}; 