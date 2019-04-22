export const toRna = (strand) => [...strand].map(c => {
  switch (c) {
    case 'G': return 'C';
    case 'C': return 'G';
    case 'T': return 'A';
    case 'A': return 'U';
    default: throw new Error('Invalid input DNA.');
  }
}).join('');
