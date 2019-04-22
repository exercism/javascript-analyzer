const transcribed = {
  A: 'U',
  C: 'G',
  G: 'C',
  T: 'A'
};

export const toRna = (dna) => {
  const rna = dna.toString().replace(/./gi, nucl => transcribed[nucl]);
  if (rna.length !== dna.length) {
    throw new Error('Invalid DNA');
  } else {
    return rna;
  }
};

