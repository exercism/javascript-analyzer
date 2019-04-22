const getDnaMapping = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export const toRna = (dnaSequence) => {
  if (dnaSequence === '') return dnaSequence;

  return [...dnaSequence]
    .reduce((resultSeq, currentChar) => {
      let newSeq = resultSeq;
      const newMapping = getDnaMapping[currentChar];

      if (!newMapping) throw new Error('Invalid input DNA.');

      newSeq += newMapping;
      return newSeq;
    }, '');
};
