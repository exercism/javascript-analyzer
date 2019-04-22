export function toRna(str) {
    return str.split('').map(c => {
        switch(c) {
            case 'C': return 'G';
            case 'G': return 'C';
            case 'A': return 'U';
            case 'T': return 'A';
            default: throw new Error('Invalid input DNA.');
        }
    }).join('');
}