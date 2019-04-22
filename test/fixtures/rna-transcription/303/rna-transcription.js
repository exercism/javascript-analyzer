export function toRna(dna) {
  if (dna.split('').filter(nucleotide => !~'GCTA'.indexOf(nucleotide)).length) throw new Error('Invalid input DNA.');
  return dna.split('').map(nucleotide => ({G: 'C', C: 'G', T: 'A', A: 'U' }[nucleotide])).join('');
}
