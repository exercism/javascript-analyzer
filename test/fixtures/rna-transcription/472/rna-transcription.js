const complements = {
  G: "C",
  C: "G",
  T: "A",
  A: "U"
};

function validate(dna) {
  const elements = dna.split("");
  let errors = 0;
  let re = /[GCTA]/;

  elements.forEach(item => {
    if (re.test(item) === false) {
      errors++;
    }
  });

  return errors;
}

export function toRna(dna) {
  const errors = validate(dna);
  if (errors > 0) {
    throw new Error("Invalid input DNA.");
  } else {
    return dna
      .split("")
      .map(item => complements[item])
      .join("");
  }
}
