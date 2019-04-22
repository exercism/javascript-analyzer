const DNATORNA = {
    'C' : 'G',
    'G' : 'C',
    'A' : 'U',
    'T' : 'A'
}

export const toRna = (strand) => {
    if(!/^[CGAT]*$/.test(strand)) throw new Error('Invalid input DNA.');
    return strand.split('').map(c => DNATORNA[c]).join('');
}
