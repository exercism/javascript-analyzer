export function toRna(input) {
    const key = {
        'G': 'C',
        'C': 'G',
        'T': 'A',
        'A': 'U',
        '': ''
    };

    const _error = function(){
        throw 'Invalid input DNA.'
    };
    
    return input.split('').map((char) => key[char] ? key[char] : _error()).join('');
}