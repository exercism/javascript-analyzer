export const toRna = sequence => {
  if (!sequence) return sequence;

  if (sequence.match(/[^ACGT]/)) throw "Invalid input DNA.";

  return sequence
    .replace(/[CG]/g, $1 => ($1 === "C" ? "G" : "C"))
    .replace(/A/g, "U")
    .replace(/T/g, "A");
};
