let DnaTranscriber = require('./rna-transcription');
let dnaTranscriber = new DnaTranscriber();

describe('Transcriptor', () => {
  xtest('empty rna sequence', () => {
    expect(dnaTranscriber.toRna('')).toEqual('');
  });

  test('transcribes cytosine to guanine', () => {
    expect(dnaTranscriber.toRna('C')).toEqual('G');
  });

  test('transcribes guanine to cytosine', () => {
    expect(dnaTranscriber.toRna('G')).toEqual('C');
  });

  test('transcribes adenine to uracil', () => {
    expect(dnaTranscriber.toRna('A')).toEqual('U');
  });

  test('transcribes thymine to adenine', () => {
    expect(dnaTranscriber.toRna('T')).toEqual('A');
  });

  test('transcribes all dna nucleotides to their rna complements', () => {
    expect(dnaTranscriber.toRna('ACGTGGTCTTAA'))
      .toEqual('UGCACCAGAAUU');
  });

  test('correctly handles invalid input', () => {
    expect(() => dnaTranscriber.toRna('U')).toThrow(new Error('Invalid input DNA.'));
  });

  test('correctly handles completely invalid input', () => {
    expect(() => dnaTranscriber.toRna('XXX')).toThrow(new Error('Invalid input DNA.'));
  });

  test('correctly handles partially invalid input', () => {
    expect(() => dnaTranscriber.toRna('ACGTXXXCTTAA')).toThrow(new Error('Invalid input DNA.'));
  });
});
