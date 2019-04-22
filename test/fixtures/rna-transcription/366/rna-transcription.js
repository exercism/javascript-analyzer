const validateDna = (str) => {
  const patt = /[^GCAT]/;
  if (patt.test(str)) {
    return false;
  }
  return true;
};


export function toRna(dna) {
  if (dna === '') return '';
  if (!validateDna(dna)) throw new Error('Invalid input DNA.');

  const rna = dna.split('').map((char) => {
    switch (char) {
      case 'G':
        return 'C';
      case 'C':
        return 'G';
      case 'A':
        return 'U';
      case 'T':
        return 'A';
    }
  }).join('');
  return rna;
}

validateDna('test');
