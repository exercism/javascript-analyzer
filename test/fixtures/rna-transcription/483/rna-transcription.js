export const toRna = dna =>
  dna.split("").reduce((rna, nucleotide) => {
    if (nucleotide === "C") {
      return rna + "G";
    } else if (nucleotide === "G") {
      return rna + "C";
    } else if (nucleotide === "A") {
      return rna + "U";
    } else if (nucleotide === "T") {
      return rna + "A";
    }
    throw new Error("Invalid input DNA.");
  }, "");
