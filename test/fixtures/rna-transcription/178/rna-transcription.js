export const toRna = (dna) => {
  const error = '[^GCTA]';
  if (dna.match(error)) {
    throw Error('Invalid input DNA.');
  }
  let rna = dna.toLowerCase();
  const chars = {
    g: 'C',
    c: 'G',
    t: 'A',
    a: 'U',
  };

  rna = rna.replace(/[gcta]/g, m => chars[m]);

  // let find = 'g';
  // let regexp = new RegExp(find, 'g');
  // rna = rna.replace(regexp, 'C');
  //
  // find = 'c';
  // regexp = new RegExp(find, 'g');
  // rna = rna.replace(regexp, 'G');
  //
  // find = 't';
  // regexp = new RegExp(find, 'g');
  // rna = rna.replace(regexp, 'A');
  //
  // find = 'a';
  // regexp = new RegExp(find, 'g');
  // rna = rna.replace(regexp, 'U');

  rna = rna.toUpperCase();

  return rna;
};
