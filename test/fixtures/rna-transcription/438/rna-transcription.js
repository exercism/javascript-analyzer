const translations = {
  A: "U",
  T: "A",
  C: "G",
  G: "C"
};

const translate = nucleotide => {
  const nucleotideRNA = translations[nucleotide];
  if (!nucleotideRNA) throw new Error("Invalid input DNA.");

  return nucleotideRNA;
};

export const toRna = dna => {
  return dna
    .split("")
    .map(translate)
    .join("");
};
