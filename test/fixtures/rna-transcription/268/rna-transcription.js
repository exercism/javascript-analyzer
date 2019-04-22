export const toRna = dna => {
  // Convert to uppercase in case input is lowercase
  const uppercaseDna = dna.toUpperCase();

  // Make sure input is valid dna
  const dnaArr = dna.split("");
  dnaArr.forEach(char => {
    if (char !== "G" && char !== "C" && char !== "T" && char !== "A") {
      throw "Invalid input DNA.";
    }
  });

  // Create an object to determine what each letter will convert to
  const mapObj = {
    G: "C",
    C: "G",
    T: "A",
    A: "U"
  };

  // Map dna chars to rna chars
  const rna = uppercaseDna.replace(/G|C|T|A/gi, i => {
    return mapObj[i];
  });

  return rna;
};
