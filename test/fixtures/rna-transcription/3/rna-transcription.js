export const toRna = (input) => {
  let rna = '';

  let dna = {G: "C", C: "G", T: "A", A: "U"};

  if(input){
    let sequence = input.split('');
    sequence.forEach(d => {
      try {
        if(d !== 'G' && d !== 'C' && d !== 'T' && d !== 'A') {
          throw('Invalid input DNA.')
        } else {
          Object.entries(dna).filter(([key, value]) => {
            if(key === d) {
              rna = rna.concat('', value)
              return rna;
            }
          })
          } 
      } catch (e) {
        throw(e)
      }
    }) 
    return rna;
  } else {
    return "";
  }
  
  
  
}