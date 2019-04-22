function toRna(dna){
  return dna_converter(dna);
}

function dna_converter(dna){
  let rna = '';
  for(let letter of dna) {
      rna += replacer(letter);
  }

  return rna
}

function replacer(letter){
  switch(letter){
    case 'G': return 'C';
    case 'C': return 'G';
    case 'T': return 'A';
    case 'A': return 'U';
    case '' : return '';
    default: throw 'Invalid input DNA.';
  }
}

export { toRna }
