const MAPPING = {
  'C': 'G',
  'G': 'C',
  'A': 'U',
  'T': 'A'
}

export const toRna = (dna_strand) => {
  return Array.from(dna_strand).map(replace_dna).join("")
}

function replace_dna(dna) {
  if (!Object.keys(MAPPING).includes(dna)) {
    throw new Error('Invalid input DNA.')
  }

  return MAPPING[dna]
}
