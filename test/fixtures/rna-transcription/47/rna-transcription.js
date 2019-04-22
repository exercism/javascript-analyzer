export const toRna = dna => {
  const input = dna.toString().toUpperCase();
  let rna = "";
  for (let i = 0; i < input.length; i++) {
    if (input.charAt(i) == "G") {
      rna += "C";
    } else if (input.charAt(i) == "C") {
      rna += "G";
    } else if (input.charAt(i) == "T") {
      rna += "A";
    } else if (input.charAt(i) == "A") {
      rna += "U";
    } else {
      throw "Invalid input DNA.";
    }
  }
  return rna;
};
