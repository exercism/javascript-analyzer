export const toRna = nucleotide => {
  let n = nucleotide.toUpperCase().split("");
  let output = [];
  let check = 0;
  for (let check in n) {
    if (
      n[check] !== "G" ||
      n[check] !== "C" ||
      n[check] !== "T" ||
      n[check] !== "A"
    ) {
      check += 1;
    }
  }
  if (check === 0) {
    for (let i in n) {
      if (n[i] === "G" || n[i] === "C" || n[i] === "T" || n[i] === "A") {
        if (n[i] === "G") output.push("C");
        if (n[i] === "C") output.push("G");
        if (n[i] === "T") output.push("A");
        if (n[i] === "A") output.push("U");
      } else {
        throw new Error("Invalid input DNA.");
      }
    }
  }
  return output.join("");
};
