const compliments = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U'
};

export const toRna = (strand) => {
  var result = '';
  if (strand.length === 0) {
    return result;
  }
  for (let i = 0; i < strand.length; i++) {
    if (compliments[strand.charAt(i)]) {
      result += compliments[strand.charAt(i)];
    } else {
      throw 'Invalid input DNA.';
    }
  }
  return result;
};