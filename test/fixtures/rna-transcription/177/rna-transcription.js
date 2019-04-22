const DnaTranscriber = function () {
};

DnaTranscriber.prototype.toRna = function(dna) {
  let rna = "";
  if (dna.match(/[^GCAT]/g)) throw (new Error("Invalid input"));
  dna.split("").forEach(function(value) {
    rna += ({"G":"C", "C": "G", "T":"A", "A":"U"}[value]);
  });
  return rna;
};

module.exports = DnaTranscriber;
