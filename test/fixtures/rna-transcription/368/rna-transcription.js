export const toRna = (dna) => {
  const dnaToRna = {
    "G" : "C",
    "C" : "G",
    "T" : "A",
    "A" : "U",
  };
  if (dna.match(/[^GCTA]/) !== null) {
    throw new Error('Invalid input DNA.');
  }
  return dna.split('').map(n => dnaToRna[n]).join('');
}