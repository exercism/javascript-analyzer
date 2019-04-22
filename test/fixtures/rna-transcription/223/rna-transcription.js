export const toRna = (str) => {
  return Array.from(str).map(x => convertLetter(x)).join('');
};

const convertLetter = (chr) =>{
  var dna_to_rna = { 'G': 'C',
                     'C': 'G',
                     'T': 'A',
                     'A': 'U' }
  var letter = chr.toUpperCase().trim()

  if (letter === ""){
    return ""
  } else if (dna_to_rna[letter] === undefined){
    throw('Invalid input DNA.')
  } else{
    return dna_to_rna[letter]
  }

}