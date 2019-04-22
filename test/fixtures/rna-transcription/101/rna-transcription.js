const Transcriptor = {
  C: "G",
  G: "C",
  A: "U",
  T: "A",
}

export const toRna = function toRna(sequence) {
  const seqArray = sequence.split('');
  const resultArray = [];
  seqArray.forEach((val) => {
    const newVal = Transcriptor[val];
    if (!newVal) {
      throw new Error("Invalid input DNA.");
    }
    resultArray.push(newVal);
  })
  return resultArray.join('');
}