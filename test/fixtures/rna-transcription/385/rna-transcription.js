export const toRna = dna => {
  const rules = {T: 'A', A: 'U', G:'C', C:'G'};
  const rna = dna.split('');

  let defectiveDna = dna.replace(/[TACG]/gi,'');

  if(rna.length > 0 && defectiveDna) {
    throw new Error('Invalid input DNA.');
  } else {
    let newRna =  rna.reduce((accumulator, currentValue) => {
      return accumulator + rules[currentValue];
    },'')

    return newRna;
  }
}
