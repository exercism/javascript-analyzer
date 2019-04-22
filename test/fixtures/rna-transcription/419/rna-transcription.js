const toRna = (dna) => {
  let rna = '';
  const complements = {G:'C',C:'G',T:'A',A:'U'};

  if (dna) {
    if (dna.match(/[^GCTA]/)) throw new Error('Invalid input DNA.');

    dna.split("").forEach(char => {
      if (Object.keys(complements).includes(char)) {
        rna += complements[[char]];
      }
    });
  }

  return rna;
}

export { toRna };