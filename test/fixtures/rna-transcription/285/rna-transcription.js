export function toRna (dna) {
  if(isEmpty(dna)){
    return ''
  }

  let rna = [];
  dna = dna.split('');
  dna.forEach(element => {
    switch(element){
      case 'A': 
        rna.push('U');
        break;
      case 'C':
        rna.push('G');
        break;
      case 'G':
        rna.push('C');
        break;
      case 'T':
        rna.push('A');
        break; 
      default: 
        throw new Error('Invalid input DNA.');
    }
  });

  return rna.join('');
}

function isEmpty(obj){
  if(typeof obj == "undefined" || obj == null || obj == ""){
      return true;
  }else{
      return false;
  }
}
