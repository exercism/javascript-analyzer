export const rnaTranscription = function(nucleotide) {
  let isValidDna = 0;

  function replace(repChar, idx, arr) {
	arr[idx] = repChar;
	isValidDna++;
  }

  let rnaArr = nucleotide.split('');
  rnaArr.forEach(function(value, index, array) {
   	if(array.length > 0 && ["T", "G", "C", "A"].includes(value)) {
      if(value == "G") replace("C", index, array);
      else if(value == "C") replace("G", index, array);
      else if(value == "T") replace("A", index, array);
      else replace("U", index, array);
    } else return false;
  });
  
  if(isValidDna == nucleotide.length) {
	return rnaArr.join('');
  } else {
	return new Error('Invalid input DNA.');
  }
}
