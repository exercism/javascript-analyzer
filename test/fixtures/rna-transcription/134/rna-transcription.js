export const toRna = (transcription) => {
  let dna = { 'G': 'C', 'C': 'G', 'T': 'A', 'A': 'U' }
  if (transcription === 'G') {
    return 'C';
  } else if (transcription === 'C') {
    return 'G';
  } else if (transcription === 'T') {
    return 'A';
  } else if (transcription === 'A') {
    return 'U';
  } else {
    transcription = transcription.split('')
    let change = ''
    for (let index = 0; index < transcription.length; index++) {
      change = transcription[index]
      if (!dna[transcription[index]]) {
        throw new Error('Invalid input DNA.');
      } else {
        transcription[index] = change.replace(transcription[index], dna[transcription[index]]);
      }
    }
    return transcription.join('');
  }    
};
