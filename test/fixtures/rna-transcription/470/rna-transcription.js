export function toRna(rna) {
  let result = "";

// * `G` -> `C`
//   * `C` -> `G`
//   * `T` -> `A`
//   * `A` -> `U`
  for(let i = 0; i < rna.length; i++) {
    if (rna[i] === "G") {
      result += 'C';
    } else if (rna[i] === "C") {
      result += "G";
    } else if (rna[i] === "T") {
      result += "A";
    } else if (rna[i] === "A") {
      result += "U";
    } else {
      throw new Error("Invalid input DNA.")
    }
  }

  return result;
}
