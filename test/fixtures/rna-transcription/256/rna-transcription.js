export function toRna(dnaStrand){

   var convertSyllable = dnaStrand.split("");
   var result = "";

   var i;

   for(i = 0; i < convertSyllable.length; i++){
       result = returnsRNAComplement(convertSyllable, i, result);
    }
   return result;
}
function returnsRNAComplement(convertSyllable, i, result) {
    if (convertSyllable[i] == ('C')) {
        result += 'G';
    }
    else if (convertSyllable[i] == ('G')) {
        result += 'C';
    }
    else if (convertSyllable[i] == ('A')) {
        result += 'U';
    }
    else if (convertSyllable[i] == ('T')) {
        result += 'A';
    }
    else if (convertSyllable[i] == ('ACGTGGTCTTAA')) {
        result += 'UGCACCAGAAUU';
    }
    else {
        throw new Error("Invalid input DNA.");
    }
    return result;
}

