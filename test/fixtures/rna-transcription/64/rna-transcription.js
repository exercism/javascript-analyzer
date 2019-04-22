export const toRna = (dna) => {
    var dnaArray = dna.split('');
    var rna = '';
    for(let i in dnaArray){
        if(dnaArray[i] === ''){
            rna = '';
        } else if(dnaArray[i].indexOf('C') >= 0) {
            rna = rna + dnaArray[i].replace('C', 'G');
        } else if(dnaArray[i].indexOf('G') >= 0) {
            rna = rna + dnaArray[i].replace('G', 'C');
        } else if(dnaArray[i].indexOf('A') >= 0) {
            rna = rna + dnaArray[i].replace('A', 'U');
        } else if(dnaArray[i].indexOf('T') >= 0) {
            rna = rna + dnaArray[i].replace('T', 'A');
        } else {
            throw('Invalid input DNA.');
        }
    }
    return rna;
}