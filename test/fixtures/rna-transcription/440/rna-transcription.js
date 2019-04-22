const transcribe = nucleotide => {
    if(nucleotide == "A") return "U";
    else if(nucleotide == "C") return "G";
    else if(nucleotide == "G") return "C";
    else if(nucleotide == "T") return "A";
    else if(nucleotide == "") return "";
    else throw new Error("Invalid input DNA.");
}

export const toRna = nucleotides => {
    let strand = nucleotides.split("");
    return strand.map(nucleotide=> transcribe(nucleotide)).join("");
}

