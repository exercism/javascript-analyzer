const DNA_TO_RNA = {
   G: 'C',
   C: 'G',
   T: 'A',
   A: 'U',
};

export const toRna = (dna) => {
   const rna = dna.replace(/./g, nucleotide => DNA_TO_RNA[nucleotide]);
   
   if (rna.includes("undefined")) {
      throw new Error("Invalid input DNA.");
   } else {
      return rna;
   }
};
