export const toRna = s => {
  if (s.match(/[^acgt]/gi)){
    throw 'Invalid input DNA.';
  }
  return s.replace(/([acgt])/gi, m => {
  switch (m[0].toUpperCase()) {
    case 'A':
      return 'U';
    case 'C':
      return 'G';
    case 'G':
      return 'C';
    case 'T':
      return 'A';
  }
})};
