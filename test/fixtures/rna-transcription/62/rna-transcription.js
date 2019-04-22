export const toRna = (dna) => {
    
    var i
    var finalDna = ''
  
      for(i = 0; i < dna.length; i++){
          
        if(dna.charAt(i) == '')
            finalDna += ''
        else if(dna.charAt(i) == 'G')
            finalDna += 'C'
        else if(dna.charAt(i) == 'C')
            finalDna += 'G'
        else if(dna.charAt(i) == 'T')
            finalDna += 'A'
        else if(dna.charAt(i) == 'A')
            finalDna += 'U'
    }
    
    if (finalDna.length !== dna.length) {
        throw new Error('Invalid input DNA.');
      } else {
        return finalDna;
      }
  }