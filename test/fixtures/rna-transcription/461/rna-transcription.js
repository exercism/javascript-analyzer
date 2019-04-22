export const toRna = (dnaStrand) => {
  const transcribeDnaMap = new Map([
    ['C', 'G'],
    ['G', 'C'],
    ['T', 'A'],
    ['A', 'U'],
  ]);

  const dnaArray = dnaStrand.split('');

  const rnaArray = dnaArray.map((x) => {
    const rnaComplement = transcribeDnaMap.get(x);
    if (rnaComplement === undefined) {
      throw new Error('Invalid input DNA.');
    }
    return rnaComplement;
  });

  const rnaString = rnaArray.join('');

  return rnaString;
};
