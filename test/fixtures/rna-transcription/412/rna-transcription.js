export function toRna(string) {

  const arrayOfDNA = string.split('');
  const result = arrayOfDNA.map((item) => {
    const outputArray = [];
    if (item == 'A') {
      outputArray.push('U');
    } else if (item == 'G') {
      outputArray.push('C');
    } else if (item == 'C') {
      outputArray.push('G');
    } else if (item == 'T') {
      outputArray.push('A');
    } else {
      throw 'Invalid input DNA.';
    }
    return outputArray;
  });
  return result.join('');
}
