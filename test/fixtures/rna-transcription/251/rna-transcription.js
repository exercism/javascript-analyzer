
const RNA_COEF = {
  'C': 'G',
  'G': 'C',
  'A': 'U',
  'T': 'A'
}

export const toRna = (rna) => {
 return rna.toUpperCase().split('').map(letter => {
    if (!RNA_COEF[letter]) throw 'Invalid input DNA.';
    
    return RNA_COEF[letter]
  }).join('');
}