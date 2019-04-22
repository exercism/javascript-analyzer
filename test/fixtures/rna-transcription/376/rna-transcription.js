export const toRna = (dnaStrand) => {
    let dnaNucleotides = ['A', 'C', 'G', 'T'];
    let rnaStrand = [];
    let dnaArray = dnaStrand.split('');


    for (let i = 0; i < dnaArray.length; i++) {
        if(!dnaNucleotides.includes(dnaArray[i])){
            throw 'Invalid input DNA.';
        } else {
            switch(dnaArray[i]) {
                case 'A':
                    rnaStrand.push('U') ;
                    break;
                case 'C':
                    rnaStrand.push('G') ;
                    break;
                case 'G':
                    rnaStrand.push('C') ;
                    break;
                case 'T':
                    rnaStrand.push('A') ;
                    break;
                case '':
                    rnaStrand = '';
                    break;
            }
        }
    }

   
    let result = '';
    for (let i = 0; i < dnaArray.length; i++) {
        result += rnaStrand[i];
    }
    return result;
}