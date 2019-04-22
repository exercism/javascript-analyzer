export const toRna = (sequence) => {
  if (sequence.length === 0) {
    return '';
  }
  return sequence.split('').map((c) => {
    switch (c) {
      case 'G':
        return 'C';
      case 'C':
        return 'G';
      case 'T':
        return 'A';
      case 'A':
        return 'U';
      default:
        throw new Error('Invalid input DNA.');
    }
  }).join('');
};
