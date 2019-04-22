export const toRna = (string) => {
  const arr = string.trim().toUpperCase().split('');
  arr.forEach((element, key) => {
    switch (element) {
      case '':
        return '';

      case 'G':
        arr[key] = 'C';
        break;

      case 'C':
        arr[key] = 'G';
        break;

      case 'T':
        arr[key] = 'A';
        break;

      case 'A':
        arr[key] = 'U';
        break;

      default:
        throw new Error('Invalid input DNA.');
    }
  });

  return arr.join('');
};
