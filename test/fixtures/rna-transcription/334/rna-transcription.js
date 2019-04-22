export const toRna = (dna) => {
    const getRna = (c) => {
        switch (c.toUpperCase()){
            case "G":
                return "C";
            case "C":
                return "G";
            case "T":
                return "A";
            case "A":
                return "U";
        }
        throw new Error('Invalid input DNA.');
    };
    let rna = "";
    for (let i = 0 ; i < dna.length; i++) {
        rna += getRna(dna[i]);
    }
    return rna;
};