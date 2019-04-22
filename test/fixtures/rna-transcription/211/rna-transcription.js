export const toRna = (string) => {
  const substances = Object.keys(string).map(key => ({
    letter: string[key],
    changed: false,
  })).map((substance) => {
    switch (substance.letter) {
      case 'G':
        if (!substance.changed) {
          return {
            letter: 'C',
            changed: true,
          };
        }
        return substance;
      case 'C':
        if (!substance.changed) {
          return {
            letter: 'G',
            changed: true,
          };
        }
        return substance;
      case 'T':
        if (!substance.changed) {
          return {
            letter: 'A',
            changed: true,
          };
        }
        return substance;
      case 'A':
        if (!substance.changed) {
          return {
            letter: 'U',
            changed: true,
          };
        }
        return substance;
      default:
        throw new Error('Invalid input DNA.');
    }
  });
  let stringToReturn = '';

  substances.forEach((substance) => {
    stringToReturn += substance.letter;
  });
  return stringToReturn;
};
