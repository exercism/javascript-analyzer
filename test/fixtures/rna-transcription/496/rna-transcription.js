export const toRna = (string) => {
  let dna = [...string];
   let rna = [];
   let convert = {
       G: "C",
       C: "G",
       T: "A",
       A: "U"
   };
   for (let i = 0; i < dna.length; i++) {
     rna[i] = convert[dna[i]]
     if (rna[i] == undefined) {
       throw "Invalid input DNA."
     }
   }
   return rna.join("");
 }
