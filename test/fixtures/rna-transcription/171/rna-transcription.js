export const toRna = (dna) => {
    var rnaArray = []//the idea is to push transciptions to an array, then convernt the array into a string
    for (var i = 0; i < dna.length; i++){
        switch(dna[i]){
            
            case 'C':
            rnaArray.push('G')
            break;
            case 'G':
            rnaArray.push('C')
            break;
            case 'A':
            rnaArray.push('U')
            break;
            case 'T':
            rnaArray.push('A')
            break;
            default:
            throw 'Invalid input DNA.'
        }
    }
    return rnaArray.join('')
}



// export const toRna = (DNA) => {
//     let RNA = "";
//     let i = 0;
//     for (i = 0; i <= DNA.length-1; i++){
//         if (DNA.charAt(i) == "G") RNA = RNA.concat("C");
//         else if (DNA.charAt(i) == "C") RNA = RNA.concat("G");
//         else if (DNA.charAt(i) == "T") RNA = RNA.concat("A");
//         else if (DNA.charAt(i) == "A") RNA = RNA.concat("U");
//         else throw "Invalid input DNA." 
//     }
//     return RNA;
// }