export const toRna = (dna) => {

    let nucleotidesSum = '';
    for (const c of dna) {
        if (c === 'G') {
            nucleotidesSum = nucleotidesSum + 'C';
        } else if (c === 'C') {
            nucleotidesSum = nucleotidesSum + 'G';
        } else if (c === 'T') {
            nucleotidesSum = nucleotidesSum + 'A';
        } else if (c === 'A') {
            nucleotidesSum = nucleotidesSum + 'U';
        } else {
            throw new Error('Invalid input DNA.');
        }
    }

    return nucleotidesSum;
};



