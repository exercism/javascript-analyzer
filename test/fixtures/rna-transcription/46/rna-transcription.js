export const toRna = (dnaString) => {
  return dnaString
    .replace(/G/g, 'C')
    .replace(/C/g, 'G')
    .replace(/T/g, 'A')
    .replace(/A/g, 'U');
};
