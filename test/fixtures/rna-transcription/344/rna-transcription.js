export const toRna = sequence => {
  const replacements = {
    G: "C",
    C: "G",
    T: "A",
    A: "U"
  }

  let newSequence = ""
  for (let i = 0; i < sequence.length; i++) {
    const newLetter = replacements[sequence[i]]
    if (newLetter) {
      newSequence += newLetter
    } else {
      throw Error("Invalid input DNA.")
    }
  }

  return newSequence
}
