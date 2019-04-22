export function toRna(sequence) {
  const string = '';
  for(let i = 0; i <= sequence.length; i++) {
    switch (sequence[i]) {
      case 'G':
        return `${string}C`;
      case 'C':
        return `${string}G`;
      case 'T':
        return `${string}A`;
      case 'A':
        return `${string}U`;
      default:
        return string;
    }
  }
  return string;
}
