const nucleotideMap = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

const invalidDnaNuleotides = /[^GCTA]/g;

module.exports.toRna = (seq) => {
  if (seq === '') {
    return seq;
  }
  if (invalidDnaNuleotides.test(seq)) {
    throw new Error('Invalid input DNA.');
  }

  // array.map technique
  // memory-intensive, no more performant at n=5000
  // return seq.split('').map(c => nucleotideMap[c]).join('');

  // regex technique
  // might be better for extremely long strings? no more performant at n=5000
  // return seq.replace(/G/g, 'c').replace(/C/g, 'g').replace(/T/g, 'a').replace(/A/g, 'u').toUpperCase();

  // concat technique
  let rna = '';
  for (let i = 0; i < seq.length; i += 1) {
    rna += nucleotideMap[seq[i]];
  }
  return rna;
};
