const transcription = {
  G: "C",
  C: "G",
  T: "A",
  A: "U"
};

const lookupRna = dna => {
  const rna = transcription[dna];
  if (!rna) throw new Error("Invalid input DNA.");
  return rna;
};

export const toRna = dna =>
  dna
    .split("")
    .map(n => lookupRna(n))
    .join("");
