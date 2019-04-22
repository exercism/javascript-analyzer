export const toRna = (arg) => {
  const dna = arg.toUpperCase();
  const dnaArr = ['G', 'C', 'T', 'A'];
  const rnaArr = ['C', 'G', 'A', 'U'];

  // essa linha esta funcionando.-
  const indexArg = dnaArr.indexOf(dna);

  if (!indexArg) {
    return rnaArr.filter((el, i) => (i === indexArg));
  }

  return '';
};
