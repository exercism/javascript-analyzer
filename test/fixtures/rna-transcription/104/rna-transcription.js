const replacements = {"G" : "C", "C" : "G", "T" : "A", "A": "U"}

const toRna = (dna) => {
  return dna.replace(/./g, nucleotide => transcribe(nucleotide))
}

const transcribe = (char) => {
  if (replacements.hasOwnProperty(char)) {
    return replacements[char]
  }
  else {
    throw new Error('Invalid input DNA.')
  }
}

export { toRna }
