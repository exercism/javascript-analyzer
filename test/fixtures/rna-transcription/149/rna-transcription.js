
const nucleotids = [
  "adenine"=A,
  "cytosine"=C,
  "guanine"=G,
  "thymine"=T,
  uracil="U"];

  var dna = function dna(){
    return [adenine, cytosine, guanine,thymine];
  }
  var rna= function rna(){
    if(dna=true){
      return[adenine, cytosine, guanine,uracil];
    }
  console.log(dna());
  console.log(rna());
