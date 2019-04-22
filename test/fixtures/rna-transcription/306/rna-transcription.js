/* eslint linebreak-style: ["error", "windows"] */

export function toRna(str) {
  const rnaLetters = ['T', 'C', 'G', 'A', ''];
  const newComponent = [];

  str.split('').forEach((char) => {
    switch (char) {
      case rnaLetters[0]:
        newComponent.push('A');
        break;
      case rnaLetters[1]:
        newComponent.push('G');
        break;
      case rnaLetters[2]:
        newComponent.push('C');
        break;
      case rnaLetters[3]:
        newComponent.push('U');
        break;
      case rnaLetters[4]:
        newComponent.push('');
        break;
      default:
        throw new Error('Invalid input DNA.');
    }
  });
  return newComponent.join('');
}
