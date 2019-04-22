export const toRna = dna => {
    if (typeof dna !== 'string') {
        throw 'Invalid input';
    }
    var chars = dna.split('');
    for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        switch (ch) {
            case 'G':
                chars[i] = 'C';
                break;
            case 'C':
                chars[i] = 'G';
                break;
            case 'T':
                chars[i] = 'A';
                break;
            case 'A':
                chars[i] = 'U';
                break;
            default:
                throw 'Invalid input DNA.';
        }
    }
    return chars.join('');
};
