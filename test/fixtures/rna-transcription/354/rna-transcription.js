export const toRna = (string) => {
  const map = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };
  const testString = /[GCTA]+$/g.test(string);
  const testEmpty = /^[\s]*$/.test(string);
  let result;
  if (testEmpty) {
    result = '';
  } else if (!testString && !testEmpty) {
    throw new Error('Invalid input DNA.');
  } else {
    result = string.replace(/[GCTA]/g, item => map[item]);
  }
  return result;
};
