export const toRna = dna => {
  const dnaMap = {
    G: "C",
    C: "G",
    T: "A",
    A: "U"
  };
  if (dna.replace(/[GCTA]/g, "")) {
    throw new Error("Invalid input DNA.");
  }
  return dna
    .split("")
    .map(x => dnaMap[x])
    .join("");
};
