const toRna = (string) => {
  const resultArr = [];

  string.split('').forEach((item) => {
    if (item === 'U' || item === 'X') {
      throw (new Error('Invalid input DNA.'));
    }

    if (item === 'G') {
      item = 'C';
      resultArr.push(item);
    } else if (item === 'C') {
      item = 'G';
      resultArr.push(item);
    } else if (item === 'T') {
      item = 'A';
      resultArr.push(item);
    } else if (item === 'A') {
      item = 'U';
      resultArr.push(item);
    }
  });

  return resultArr.join('');
};

export { toRna };
