export const toRna = (str) => {
  let rna = []

  const search = (dna) => {
    switch(dna) {
        case '':
          rna.push('');
          break;
        case 'C':
          rna.push('G');
          break;
        case 'G':     
          rna.push('C');
          break;
        case 'A':    
          rna.push('U');
          break;
        case 'T':    
          rna.push('A');
          break;
        default:
         throw 'Invalid input DNA.'
         break;
      }
    }
 
  for (var i = 0; i < str.length; i++) {
    search(str[i]);
  }

  return rna.join('');
  
};