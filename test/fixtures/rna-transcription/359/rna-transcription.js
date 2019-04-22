let toRna = (dna) => {
    let rna = ""; 
    for(var i=0; i<dna.length; i++) {
        switch (dna[i]) {
            case "a":
                rna = rna + "u"
                break;
            case "c":
                rna = rna + "g";
                break;
            case "t":
                rna = rna + "a";
                break;
            case "g": 
                rna = rna + "c";
                break;
            default:
                break;
        }
    }
    return rna;
}