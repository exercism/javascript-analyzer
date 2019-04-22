const dna_to_rna_map = new Map([['G', 'C'], ['C', 'G'], ['T', 'A'], ['A', 'U']]);
const transcode = dna_code => {
  if (!dna_to_rna_map.has(dna_code)) throw new Error('Invalid input DNA.');
  return dna_to_rna_map.get(dna_code);
}
export const toRna = str => !str.length ? '' : [...str].map(transcode).join('');
