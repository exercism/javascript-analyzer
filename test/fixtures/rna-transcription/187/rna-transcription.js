function transcribe(nucleotide) {
  var nucleotidePairs = {
    'C': 'G',
    'A': 'U',
    'T': 'A',
    'G': 'C',
    '': ''
  }
  return nucleotidePairs[nucleotide]
}

function toRna (nucleotides) {
  var nucleotideArray = nucleotides.split('')
  var length = nucleotideArray.length
  var string = ''
  for (var i = 0; i < length; i++) {
    var transcribed = transcribe(nucleotideArray[i]);
    string += transcribed
    if (!transcribed) {
      throw Error('Invalid input DNA.')
    }
  }
  return string;
}

module.exports = {
  toRna: toRna
}
