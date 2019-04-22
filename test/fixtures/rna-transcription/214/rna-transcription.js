export function toRna(x) {
  let r = '';
  for (let i = 0; i < x.length; i++) {
    const c = x[i];
    switch (c) {
      case 'G':
        r += 'C';
        break;
      case 'C':
        r += 'G';
        break;
      case 'T':
        r += 'A';
        break;
      case 'A':
        r += 'U';
        break;
      default:
        throw 'Invalid input DNA.';
        break;
    }
  }
  return r;
}
