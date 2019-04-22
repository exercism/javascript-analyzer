const EMPTY_STRING = '';

function toRnaNucleotide(dnaNucleotide) {
  const dnaToRnaNucleotideMap = {'G': 'C', 'C': 'G', 'T': 'A', 'A': 'U'};

  if (dnaToRnaNucleotideMap[dnaNucleotide]) {
    return dnaToRnaNucleotideMap[dnaNucleotide];
  }

  throw new Error('Invalid input DNA.');
}

export function toRna(dna) {
  if (dna === EMPTY_STRING) {
    return EMPTY_STRING;
  }

  return String(dna)
    .split(EMPTY_STRING)
    .map(toRnaNucleotide)
    .join(EMPTY_STRING)
}
