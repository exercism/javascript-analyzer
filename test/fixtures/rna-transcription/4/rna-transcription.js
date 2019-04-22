export const toRna = function (nucleotides) {
    //converted string to array
    let charArray = nucleotides.split('');
    let finalString = '';

    //converted the letters and added to finalString
    for(let i = 0; i < nucleotides.length; i++) {
        switch(nucleotides[i]) {
            case 'G':
                finalString += 'C';
                break;
            case 'C':
                finalString += 'G';
                break;
            case 'T':
                finalString += 'A';
                break;
            case 'A':
                finalString += 'U';
                break;
            default:
                throw Error("Invalid input DNA.");
        }
    }

    return finalString;
}