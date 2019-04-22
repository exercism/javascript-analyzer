export function toRna (DNA){
  DNA = DNA.toUpperCase();
  var x = /[agct]/i;
  if (!DNA) {
    DNA = "";
    return DNA;
  }else if (x.test(DNA) && !/[^agct]/i.test(DNA)) {
    DNA = DNA.replace(/A/g,'U').replace(/G/g,'C').replace(/C/g,'G').replace(/T/g,'A');
    return DNA;
  }else if (/[^agct]/i.test(DNA)){
    throw new Error ('Invalid input DNA.');
  }
}
