const rnaTranscription = {
  G: "C",
  C: "G",
  T: "A",
  A: "U"
};

export const toRna = dna => dna.split('').map(element => {
  if(!rnaTranscription.hasOwnProperty(element)) throw new Error('Invalid input DNA.');
  return rnaTranscription[element];
}).join('');
