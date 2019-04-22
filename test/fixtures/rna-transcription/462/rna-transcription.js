export function toRna(dna) {
  const rnaString = [];
  for (let i = 0; i < dna.length; i++) {
    dna[i] === "G"
      ? rnaString.push("C")
      : dna[i] === "C"
      ? rnaString.push("G")
      : dna[i] === "T"
      ? rnaString.push("A")
      : dna[i] === "A"
      ? rnaString.push("U")
      : null;
  }
  return rnaString.join("");
}
