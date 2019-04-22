export const toRna = dna =>  {
  let map = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
  }
  return dna
    .split('')
    .map(c => map[c] || (() => { throw 'Invalid input DNA.' })())
    .join('')
}
