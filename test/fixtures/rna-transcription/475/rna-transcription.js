var rna_conv = (rna) => {

    let regexp = new RegExp("[GCTA]");
    let newreg = new RegExp("[^GCTA]");

    try
    {   

        if(rna === ""){
            return rna;
        }  
        
        if (!regexp.test(rna) ||  newreg.test(rna)){
            throw new Error("Invalid input DNA.");
            //throw true;
        }
   
        rna = rna.replace(/G/g, "Q");
        rna = rna.replace(/C/g, "G");
        rna = rna.replace(/Q/g, "C");
        rna = rna.replace(/A/g, "U");
        rna = rna.replace(/T/g, "A");
    
    } catch (ex) {
        console.log(ex.name + ": " + ex.message);
        throw new Error("Invalid input DNA.");
    }

    return rna;
}

export default rna_conv;

