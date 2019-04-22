const dnaToRnaMapping = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U'
};

export const toRna = dnaStrand =>
  dnaStrand.split('')
           .map(mapDnaToRna)
           .join('');

function mapDnaToRna(character){
  if(!(character in dnaToRnaMapping))
    throw 'Invalid input DNA.';
  
  return dnaToRnaMapping[character];
}