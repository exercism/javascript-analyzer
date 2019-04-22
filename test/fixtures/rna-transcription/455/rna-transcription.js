function toRna(dna) {
  let output = '';
  const retSwitch = (letter) => {
    switch (letter) {
      case 'C':
        return 'G';
      case 'A':
        return 'U';
      case 'T':
        return 'A';
      case 'G':
        return 'C';
      default:
        throw new Error('Invalid input DNA.');
    }
  };

  for (const letter of dna) {
    output += retSwitch(letter);
  }
  return output;
}
module.exports = {
  toRna,
};
