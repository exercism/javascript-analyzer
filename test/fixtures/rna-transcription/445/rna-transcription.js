export function toRna(nucleotides) {
  let complements = new Map([['G','C'], ['C','G'], ['T','A'], ['A','U']]);

  return Array.from(nucleotides, el => {
    if(!complements.get(el)) {
      throw new Error('Invalid input DNA.');
    }
    return complements.get(el);
  }).join('');
}