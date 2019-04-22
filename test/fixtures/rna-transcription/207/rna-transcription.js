export const toRna = (rna) => {
  const mappingDict = {
    G: 'C', C: 'G', T: 'A', A: 'U',
  };
  let outputSequence = '';
  for (let i = 0; i < rna.length; i += 1) {
    if (rna[i] in mappingDict) {
      outputSequence += mappingDict[rna[i]];
    } else {
      throw new Error('Invalid input DNA.');
    }
  }
  return outputSequence;
};
