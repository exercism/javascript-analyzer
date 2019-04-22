export const toRna = (nucl) => {
    if (nucl === '') return '';
    const transcriptions = {
        G: 'C',
        C: 'G',
        T: 'A',
        A: 'U'
    };
    return nucl.split('').map(n => {
        if (transcriptions[n] === undefined) throw new Error('Invalid input DNA.');
        return transcriptions[n];
    }).join('');
}