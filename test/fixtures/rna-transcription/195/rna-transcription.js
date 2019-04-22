export const toRna = input => {
  const dic = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };
  return input
    .split('')
    .map(element => {
      if (element === '') return '';
      else if (dic[element] === undefined) throw 'Invalid input DNA.';
      else return dic[element];
    })
    .join('');
};
