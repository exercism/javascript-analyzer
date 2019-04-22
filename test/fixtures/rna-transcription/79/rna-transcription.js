export const toRna = (rna) => {
    /*switch (rna) {
        case 'G':
            return 'C';
            break;
        case 'C':
            return 'G';
            break;
        case 'T':
            return 'A';
            break;
        case 'A':
            return 'U';
            break;
        default:
            return rna;
            break;
    }
}


dnaReturned = '';
if (rna.length > 1) {
    rnaStr[] = rna.split()
    return dnaReturned
}
    else {
        throw new Error('Invalid input DNA.')
    }
       dnaReturned = '';
if (rna.length > 1) {
    rnaStr() = rna.split()
    return dnaReturned
}
    else {
        throw new Error('Invalid input DNA.')
    }
return rnaStr
ACGTGGTCTTAA
rna[0] ==> rnaStr ='A'
rna[1] ==> rnaStr ='AG'
*/
    var rnaStr = '';
    for (let i = 0; i<rna.length; i++) {
        if (rna[i] === 'G' ){
            rnaStr += 'C'
         }
         else if (rna[i] === 'C') {
             rnaStr += 'G'
         }
         else if (rna[i] === 'T') {
             rnaStr += 'A'
         }
         else if (rna[i] === 'A') {
            rnaStr += 'U'
        }
        else {
            throw new Error('Invalid input DNA.');
        }
         
    }

    return rnaStr
}