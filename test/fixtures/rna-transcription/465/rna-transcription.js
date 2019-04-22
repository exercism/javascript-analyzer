export const toRna = (sequence) => {
    
    return sequence
            .split('')
            .map(mapRna)
            .join('');
};

const mapRna = (letter) => {
    if (rnaMap[letter]) {
        return rnaMap[letter];
    } else {
        throw new Error('Invalid input DNA.');
    }
};

const rnaMap = {
    C: 'G',
    G: 'C',
    A: 'U',
    T: 'A'
};