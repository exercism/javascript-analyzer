export function toRna(dna) {
  return dna
    .split("")
    .map(n => {
      const m = { G: "C", C: "G", T: "A", A: "U" }[n];
      if (!m) throw "Invalid input DNA.";
      return m;
    })
    .join("");
}
