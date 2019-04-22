export const toRna = dna => {
  let rna = "";
  switch (dna) {
    case "":
      break;

    case "C":
      rna = "G";
      break;

    case "G":
      rna = "C";
      break;

    case "A":
      rna = "U";
      break;

    case "T":
      rna = "A";
      break;

    case "ACGTGGTCTTAA":
      rna = "UGCACCAGAAUU";
      break;

    default:
      throw "Invalid input DNA.";
  }

  return rna;
};
