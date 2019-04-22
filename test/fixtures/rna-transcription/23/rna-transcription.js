const transcription = {
  G: "C",
  C: "G",
  T: "A",
  A: "U"
}

export function toRna(DNA) {
  if (!DNA.length) {
    return DNA;
  }
  else {
    let RNA = '';
    DNA.split('').forEach(letter => {
      if (("GCTA").includes(letter)){
        RNA += transcription[letter];
      }
      else {
        throw 'Invalid input DNA.';
      }
    });
    return RNA;
  }
}
