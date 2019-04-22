export function toRna(dna) {
  let result = "";
  for (var i = 0; i < dna.length; i++) {
    var d = dna[i];
    switch (d) {
      case 'A': d = 'U';
      break;
      case 'C': d = 'G';
      break;
      case 'T': d = 'A';
      break;
      case 'G': d = 'C';
       break;
      default:
	throw new Error("Invalid input DNA.");
	break;
    }
    result += d;
  }
  return result;
}
