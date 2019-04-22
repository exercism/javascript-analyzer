export const toRna = (str) => {
  const dict = {'G' : 'C', 'C' : 'G', 'T' : 'A', 'A' : 'U'};
  let result = '';
  for (let char of str) {
    if (dict[char]) {
      result += dict[char];
    } else {
      throw new Error('Invalid input DNA.');
    }
  }
  return result; 
}





