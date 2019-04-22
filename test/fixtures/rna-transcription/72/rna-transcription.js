export const toRna = (dna) => {
  const complement = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
  }

  let rna = ''; 
  
  for (let i in dna) {
    complement[dna[i]] ? 
      rna += complement[dna[i]]
      : (() => {throw 'Invalid input DNA.'})()
 
    // dna[char] === 'G' ? rna += 'C' : null
    // dna[char] === 'C' ? rna += 'G' : null
    // dna[char] === 'T' ? rna += 'A' : null
    // dna[char] === 'A' ? rna += 'U' : null
  }

  // return rna.length === dna.length ? rna : function () { throw 'Invalid input DNA.' } 
  return rna;
}

// toRna('ACGTXXXCTTAA')