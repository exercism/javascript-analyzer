function toRna(dna) {
  // return empty string if null or empty
  if (!dna) return ''

  // throw an error if the string contains anything except for GCTA
  if (!/^[GCTA]+$/.test(dna)) throw new Error('Invalid input DNA.')

  // define translation 'array' object
  let transcription = { 'G':'C', 'C':'G', 'T':'A', 'A':'U' }

  // 1) split the dna string into character array
  // 2) use the map function to translate
  //    each character in the array
  // 3) then rejoin the array into a single string
  return dna.split('').map(x => transcription[x]).join('');
}

export { toRna }
