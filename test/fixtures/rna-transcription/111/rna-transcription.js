const nucMap = new Map().set('G', 'C').set('C', 'G').set('T', 'A')
  .set('A', 'U');

export const toRna = (nucleotide) => {
  let trans = '';
  nucleotide.split('').forEach((entry) => {
    if (nucMap.get(entry) === undefined) throw new Error('Invalid input DNA.');
    trans += nucMap.get(entry);
  });
  return trans;
};
