export const toRna = dna => {
  const transform = {
    G: "C",
    C: "G",
    T: "A",
    A: "U"
  };
  const rna = [...dna].map(item => {
    if (transform[item] !== undefined) {
      return (item = transform[item]);
    } else {
      throw new Error("Invalid input DNA.");
    }
  });
  return rna.join("");
};
