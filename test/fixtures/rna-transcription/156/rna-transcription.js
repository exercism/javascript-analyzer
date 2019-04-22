export const toRna = (input) => {
  const dnaRe = /^[CGAT]+$/i;
  const isDna = dnaRe.test(input);
  let output = '';

  if (input === '') {
    output = input;
  } else if (isDna === true) {
    output = input.replace(/C|G/g, (r) => {
      if (r === 'C') {
        return 'G';
      }
      return 'C';
    }).replace(/A/g, 'U').replace(/T/g, 'A');
  } else {
    throw new Error('Invalid input DNA.');
  }
  return output;
};
