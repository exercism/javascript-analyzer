export const toRna = (dnaValue = '') => {
  if (dnaValue === '') return '';

  if (/[^CGAT]/g.test(dnaValue)) throw new Error('Invalid input DNA.');

  return dnaValue.split('').map(value => {
    switch (value) {
      case 'C':
        return 'G'
      case 'G':
        return 'C';
      case 'A':
        return 'U';
      case 'T':
        return 'A';
    }
  }).join('');
};