const DNAtoRNA = new Map([ // DNA:RNA, KEY:VALUE
    ["G", "C"],
    ["C", "G"],
    ["T", "A"],
    ["A", "U"]
]);

export const toRna = (DNAString) => {
    let RNAString = "";

    for(let i = 0; i < DNAString.length ; i++){
        if(!DNAtoRNA.get(DNAString[i])){
            throw new Error('Invalid input DNA.');
        }

        RNAString += DNAtoRNA.get(DNAString[i]);
    }

    return RNAString;
}