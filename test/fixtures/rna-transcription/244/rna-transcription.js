export const toRna = (dnaStrand) => {
  const transcriptionTable = {
    G: "C",
    C: "G",
    T: "A",
    A: "U"
  };

  const matcher = new RegExp(Object.keys(transcriptionTable).join("|"), "g");
  const transcribe = m => transcriptionTable[m];

  const validDNA = strand => !strand ||
    (Array.isArray(strand.match(matcher)) &&
      strand.match(matcher).length === strand.length);

  if (validDNA(dnaStrand))
  {
    return dnaStrand.replace(matcher, transcribe);
  }

  else
  {
    throw "Invalid input DNA.";
  }
};

