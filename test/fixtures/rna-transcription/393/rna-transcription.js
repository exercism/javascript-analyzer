class Transcription {
  constructor() {
    this.relationship = {
      G: 'C',
      C: 'G',
      T: 'A',
      A: 'U',
    };
  }

  toRna(dna) {
    if (!this.validate(dna)) {
      throw new Error('Invalid input DNA.');
    }

    return [...dna].reduce((carry, item) => carry + this.relationship[item], '');
  }

  validate(dna) {
    return [...dna].every(nucleotide => nucleotide in this.relationship);
  }
}

export const toRna = dna => (new Transcription()).toRna(dna);
