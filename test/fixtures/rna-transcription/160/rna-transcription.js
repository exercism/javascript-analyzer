function toRna(dna){
  let rna="";
  for(var i=0; i < dna.length; i++) {
    switch(dna[i]){
      case "G":
        rna+="C";
        break;
      case "C":
        rna+="G";
        break;
      case "T":
        rna+="A";
        break;
      case "A":
        rna+="U";
        break;
      default:
        throw Error('Invalid input DNA.');
    }
  }
  return rna
}

module.exports={
  toRna:toRna
};
