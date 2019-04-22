const controlChart = {
  G: "C",
  C: "G",
  T: "A",
  A: "U"
};
export function toRna(dna) {
  return dna
    .split("")
    .map(item => {
      if (controlChart[item]) return controlChart[item];
      else throw Error("Invalid input DNA.");
    })
    .join("");
}
