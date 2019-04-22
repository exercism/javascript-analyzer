export let toRna;

toRna = function(sequence) {

  let rna = "";

  if (sequence.match(/[^GCTA]/g) !== null) {
    throw new Error("Invalid input DNA.");
  }
  else {
    for (let char of sequence) {
      switch (char) {
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
      }
    }
  return rna;
  }
}
