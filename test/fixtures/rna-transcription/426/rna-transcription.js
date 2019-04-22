export const toRna = (sequence) => {
  const mapping = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };
  return [...sequence]
    .map((s) => {
      if (s.match(/G|C|T|A/)) {
        return mapping[s];
      }
      throw new Error('Invalid input DNA.');
    })
    .join('');
};
