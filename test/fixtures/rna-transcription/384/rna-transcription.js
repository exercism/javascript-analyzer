export 
const toRna = string => {
    const translation = new Map( [['C',  'G'], ['G', 'C'], ['A', 'U'], ['T', 'A'] ]);

    if(string === '') {
        return '';
    }
    else if(string.split('').some(letter => !translation.has(letter))) {
        throw new Error('Invalid input DNA.')
    }
    else {
        return string.split('').map(letter => translation.get(letter)).join(""); 
    }
}

