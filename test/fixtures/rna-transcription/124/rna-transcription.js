export const toRna = (dnaStr) => {
  const baseMappings = {
    'G':'C',
    'C':'G',
    'T':'A',
    'A':'U'
  }
  
  if (dnaStr == '') {
    return '' 
  } else if (dnaStr.match(/[^GCTA]/)) {
    throw new Error('Invalid input DNA.');
  } else if (dnaStr.match(/[GCTA]/)) {
    return dnaStr.split('').map( char => baseMappings[char]).join('')
  }
}
