export const toRna = dna => {
    return dna.split('').map(n => {
        if (['G', 'C', 'T', 'A', ''].includes(n)) {
            switch(n) {
                case 'G':
                    return 'C';
                case 'C':
                    return 'G';
                case 'T':
                    return 'A';
                case 'A':
                    return 'U';
                default:
                    return '';
            }
        }
        else {
            throw 'Invalid input DNA.';
        }
    }).join('');
}