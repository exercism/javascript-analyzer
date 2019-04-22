export const toRna = (dna) => {
  if (dna.length === 0) return '';
  
  const MAPPING = {
    G:'C',
    C: 'G',
    T:'A',
    A:'U'
 }

  let result = '';
  
  for (let i = 0; i < dna.length; i++) {
    let nucleotide = dna.charAt(i);
    let complement = MAPPING[nucleotide];
    if (complement === undefined) {
      throw new Error('Invalid input DNA.');
    }
    result += complement;
  }
  return result;
}
