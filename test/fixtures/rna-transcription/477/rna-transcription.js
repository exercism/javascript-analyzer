// * `G` -> `C`
// * `C` -> `G`
// * `T` -> `A`
// * `A` -> `U`
const toRna = (str) => {
  const arrStr = str.split('');
  const result = [];
  for (let s of arrStr) {
    switch (s) {
      case 'G':
        s = 'C';
        break;
      case 'C':
        s = 'G';
        break;
      case 'T':
        s = 'A';
        break;
      case 'A':
        s = 'U';
        break;
      case '':
        s = '';
        break;
      default:
        throw new Error('Invalid input DNA.');
    }
    result.push(s);
  }
  return result.join('');
};

module.exports = { toRna };
