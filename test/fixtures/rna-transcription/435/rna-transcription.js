/**
 * DNA to RNA transcription map
 * G -> C
 * C -> G
 * T -> A
 * A -> U
 */

const DNA_RNA_MAP = {
  G: "C",
  C: "G",
  T: "A",
  A: "U"
};

const getComplement = n => {
  if (!DNA_RNA_MAP[n]) {
    throw new Error("Invalid input DNA.");
  }

  return DNA_RNA_MAP[n];
};

export const toRna = dna =>
  dna
    .split("")
    .map(getComplement)
    .join("");
