function transcribe(input) {
  switch (input) {
    case '':
      return '';
    case 'C':
      return 'G';
    case 'G':
      return 'C';
    case 'A':
      return 'U';
    case 'T':
      return 'A';
    default:
      throw new Error('Invalid input DNA.');
  }
}

export const toRna = input => input
  .split('')
  .map(transcribe)
  .join('');
