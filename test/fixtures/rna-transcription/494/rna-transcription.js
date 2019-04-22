export function toRna(str){
    var dnaToRna = {"G": "C", "C": "G", "T": "A", "A": "U"};
    var rna = "";
    var dna = str.split("");
    for (var i in dna) {
      var nucl = dna[i];
      if (!(nucl in dnaToRna)) throw new Error("Invalid input DNA.")
      rna += dnaToRna[nucl];
    }
    return rna;
}
