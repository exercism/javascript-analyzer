const DNAtoRNA = {
  'G': 'C',
  'C': 'G',
  'T': 'A',
  'A': 'U'
};

export const toRna = (dnaStrand) => {
  if (!dnaStrand) return '';
  let result = dnaStrand.split('');
  result = result.map((dnaNucletide) => {
      if (DNAtoRNA.hasOwnProperty(dnaNucletide)) {
        return DNAtoRNA[dnaNucletide];
      } else {
        throw new Error('Invalid input DNA.');
      }
  });
  console.log(result);
  return result.join('');
};
