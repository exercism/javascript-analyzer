'use strict'

export const toRna = dna => {
    const dnaRnaMap = { T: 'A', A: 'U', G: 'C', C: 'G' };
    const rna = dna.split('');
  
    return rna.map((letter) => {
      if (letter in dnaRnaMap) {
        return dnaRnaMap[letter];
      }
      throw new Error('Invalid input DNA.');
    }).join('');
};