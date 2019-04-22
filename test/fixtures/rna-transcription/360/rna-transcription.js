export const toRna = (rna = '') => {
  const transcriptor = {
    'G' : 'C',
    'C' : 'G',
    'T' : 'A',
    'A' : 'U',
  }
  
  return rna.split('').map(char => {
    let value = transcriptor[char]
    if (value === undefined)
      throw new Error('Invalid input DNA.') 
    return value;
  }).join('')
}
