const DNA_TO_RNA_MAP = {
    'G':'C',
    'C':'G',
    'T':'A',
    'A':'U'
}

export const toRna = (dna) => {
    let rna = "";

    for(let i = 0; i < dna.length; i++){
        const dnaNucleotide = dna[i];
        const rnaComplement = DNA_TO_RNA_MAP[dnaNucleotide];

        if(!rnaComplement){
            throw new Error('Invalid input DNA.');
        }

        rna += rnaComplement;
    }

    return rna;
}
