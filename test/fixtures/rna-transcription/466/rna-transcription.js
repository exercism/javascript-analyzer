export const toRna = (input) => {
  let rna = [];
  if (input === '') return '';
  if (!input.match(/^[GCTA]+$/)) throw new Error('Invalid input DNA.');
  for (let i = 0; i < input.length; i += 1) {
    if (input[i] === 'G') rna += 'C';
    if (input[i] === 'C') rna += 'G';
    if (input[i] === 'T') rna += 'A';
    if (input[i] === 'A') rna += 'U';
  }
  return rna;
};
