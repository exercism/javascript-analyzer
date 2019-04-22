String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

export const toRna = (dna) => {
  if (dna.length > 0 && /^[CGTA]+$/.test(dna) === false){
    throw new Error('Invalid input DNA.')
  }
  return dna.replaceAll('C','X').replaceAll('G','C').replaceAll('A','U').replaceAll('T','A').replaceAll('X','G')
};
