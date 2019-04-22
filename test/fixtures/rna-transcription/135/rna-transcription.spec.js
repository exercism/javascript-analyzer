import { toRna } from './rna-transcription';

describe('Transcriptor', () => {
  test('empty rna sequence', () => {
    expect(toRna('')).toEqual('');
  });

  test('transcribes cytosine to guanine', () => {
    expect(toRna('C')).toEqual('G');
  });

  test('transcribes guanine to cytosine', () => {
    expect(toRna('G')).toEqual('C');
  });

  test('transcribes adenine to uracil', () => {
    expect(toRna('A')).toEqual('U');
  });

  test('transcribes thymine to adenine', () => {
    expect(toRna('T')).toEqual('A');
  });

  test('transcribes all dna nucleotides to their rna complements', () => {
    expect(toRna('ACGTGGTCTTAA'))
      .toEqual('UGCACCAGAAUU');
  });

  test('correctly handles invalid input', () => {
    expect(() => toRna('U')).toThrow(new Error('Invalid input DNA.'));
  });

  test('correctly handles completely invalid input', () => {
    expect(() => toRna('XXX')).toThrow(new Error('Invalid input DNA.'));
  });

  test('correctly handles partially invalid input', () => {
    expect(() => toRna('ACGTXXXCTTAA')).toThrow(new Error('Invalid input DNA.'));
  });
});
