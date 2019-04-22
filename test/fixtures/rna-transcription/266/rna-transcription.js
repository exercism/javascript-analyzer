export const toRna = (dna) => {
  var rna = "";
  for ( var i = 0; i < dna.length; i++ ) {
    switch (dna.charAt(i).toUpperCase()) {
      case "G":
        rna += "C";
        break;
      case "C":
        rna += "G";
        break;
      case "T":
        rna += "A";
        break;
      case "A":
        rna += "U";
        break;
      default:
	throw new Error("Invalid input DNA.");
    }
  }
  return rna;
}
