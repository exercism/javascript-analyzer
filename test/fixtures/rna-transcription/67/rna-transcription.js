var dna2Rna = new Map([['G', "C"], ["C", "G"], ["T", "A"], ["A", "U"]]);

const toRna = function (dna) {
  try {
    var rna = dna.split('')
      .reduce(function (rna, dnaNucleotide) {
        const rnaNucleotide = dna2Rna.get(dnaNucleotide);

        if (rnaNucleotide === undefined) {
          throw "Invalid input DNA.";
        }

        return rna + rnaNucleotide;
      }, '');
  } catch (e) {
    throw e;
  }

  return rna;
};

export { toRna };
