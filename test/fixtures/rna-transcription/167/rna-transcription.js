var translationTable = {
  'G': 'C',
  'C': 'G',
  'T': 'A',
  'A': 'U'
}

export function toRna(input) {
  if (input.search(/[^GCTA]/) != -1) throw new Error('Invalid input DNA.');
  var result = ''
  for(let c of input) {
    result = result + translationTable[c];
  }
  return result;
}
