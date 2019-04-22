import {
  toRna
} from './rna-transcription.js';

describe("Transcriptor", function () {
  it("empty rna sequence", function () {
    expect(toRna('')).toEqual('');
  });

  it("transcribes cytosine to guanine", function () {
    expect(toRna('C')).toEqual('G');
  });

  it("transcribes guanine to cytosine", function () {
    expect(toRna('G')).toEqual('C');
  });

  it("transcribes adenine to uracil", function () {
    expect(toRna('A')).toEqual('U');
  });

  it("transcribes thymine to adenine", function () {
    expect(toRna('T')).toEqual('A');
  });

  it("transcribes all dna nucleotides to their rna complements", function () {
    expect(toRna('ACGTGGTCTTAA')).toEqual('UGCACCAGAAUU');
  });

  it("correctly handles invalid input", function () {
    expect(() => toRna('U')).toThrow(new Error('Invalid input DNA.'));
  });

  it("correctly handles completely invalid input", function () {
    expect(() => toRna('XXX')).toThrow(new Error('Invalid input DNA.'));
  });

  it("correctly handles partially invalid input", function () {
    expect(() => toRna('ACGTXXXCTTAA')).toThrow(new Error('Invalid input DNA.'));
  });
});
