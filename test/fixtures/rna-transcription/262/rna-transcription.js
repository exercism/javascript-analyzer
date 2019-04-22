export const toRna = sequence => {
  const dnaArray = sequence.split("");
  const rnaArray = [''];

  for (let i = 0; i < dnaArray.length; i++) {
    if (dnaArray[i] === "G") {
      rnaArray.push("C");
    } else if (dnaArray[i] === "C") {
      rnaArray.push("G");
    } else if (dnaArray[i] === "T") {
      rnaArray.push("A");
    } else if (dnaArray[i] === "A") {
      rnaArray.push("U");
    } else {
      throw 'Invalid input DNA.'; 
    }
  }
  return rnaArray.join('');
};
