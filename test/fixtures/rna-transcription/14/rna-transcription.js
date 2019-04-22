export const toRna = (dna) => {
    let dnaArr = ['G','C', 'T' ,'A'];

    if (dna === '') {
        return '';
    }
    if (!!dna) {
        var flag = dna.split('').every((char) => {
            if (dna == 'ACGTGGTCTTAA') {
                console.log('dnaArr.indexOf(char)', dnaArr.indexOf(char), char)
           
            } 
            return dnaArr.indexOf(char) != -1;
        })
        console.log(dna, flag);
    }

    if (!flag) {
        throw new Error('Invalid input DNA.')
    } else {
        var arr= dna.split('').map((char) => {
            switch(char) {
                case 'G' : return 'C'; break;
                case 'C' : return 'G'; break;
                case 'T' : return 'A'; break;
                case 'A' : return 'U'; break;
                default: return ''; break;
            }
        })
    }
    
    return arr.join('');
}