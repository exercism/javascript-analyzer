export const toRna = (dna) => {
  if(dna !== 'A' && dna !== 'C' && dna !== 'G' && dna !== 'T'){
    return '';
  }
  if(dna === ''){
    return '';
  }
  if(dna === 'A'){
     return 'U';
   }

  if(dna === 'C'){
    return 'G';
  }

  if(dna === 'T'){
    return 'A';
  }
  if(dna === 'G'){
    return 'C';
  }

};

