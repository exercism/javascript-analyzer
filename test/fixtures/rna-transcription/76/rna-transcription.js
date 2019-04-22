// losgehts

// Var.1 long, but more readable
export const toRna = (rna) => {
  let dna = [];
  for (var i = 0; i < rna.length; i++) {
    switch (rna[i]) {
      case 'G':
        dna[i] = 'C';
        break;
      case 'C':
        dna[i] = 'G';
        break;
      case 'T':
        dna[i] = 'A';
        break;
      case 'A':
        dna[i] = 'U';
        break;
      default:
        throw new Error('Invalid input DNA.');
    }
  }
  return dna.join('');
}

// Var.2 short-4-line-solution
export const toRnaII = (input) => {
  let dic = new Map([['G', 'C'], ['C' , 'G'], ['T' , 'A'], ['A' , 'U']]);
  let result = input.split('');
  result.forEach( (e, i, a) => {a[i] = dic.get(a[i]) || (function(){throw new Error('Invalid input DNA.')}())} );
  return result.join('');
}
