const dnaRnaList = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
  };
  export const toRna = (dna) => {
    if (dna === '') {
      return '';
    }
    const rnaCode = {};
    Object.assign(rnaCode, dna.match(/.{1}/g).reduce((acc, nucleotide) => {
      if (dnaRnaList[nucleotide] === undefined) {
        throw new Error('Invalid input DNA.');
      }
      return { result: acc.result.concat([dnaRnaList[nucleotide]])};
    }, { result: ''}));
    return rnaCode.result;
  };
