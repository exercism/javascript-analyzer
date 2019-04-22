export const toRna = (string) => {
  if (string == '') return string;
  var nukes = {
    "G" : "C",
    "C" : "G",
    "T" : "A",
    "A" : "U"
  }

  var rna = [];
  for (var i = 0; i < string.length; i++) {
    if (!Object.keys(nukes).includes(string[i])) {
      throw "Invalid input DNA.";
    } else {
      rna.push(nukes[string[i]]);
    };
  }

  return rna.join("");
}
