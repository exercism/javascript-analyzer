export const toRna = function(dna) {
    var rnaString = []; //following phrases push to an array
        for (var i=0; i < dna.length; i++) {
switch(dna[i]) {//check character instead all string
    case 'G':
        rnaString.push('C');
        continue;
    case 'C':
        rnaString.push('G');
        continue;
    case 'A':
        rnaString.push('U');
        continue;
    case 'T':
        rnaString.push('A');
        continue;
    default: //this function will always appear if the others aren't met
        throw 'Invalid input DNA.'
    }
}
 return rnaString.join('');
} //pushed the array into a string