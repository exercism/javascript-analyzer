export const toRna = (seq) => {
  const RNA = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  }
  let transcription = '';

  for (let i = 0; i < seq.length; i++) {
    if (!RNA[seq[i]]) {
      throw new Error('Invalid input DNA.')
    }
    transcription += RNA[seq[i]]
  }

  return transcription;
};