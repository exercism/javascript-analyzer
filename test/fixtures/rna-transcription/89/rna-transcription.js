function f(x) {
    switch (x) {
        case 'G':
            return 'C';
        case 'C':
            return 'G';
        case 'T':
            return 'A';
        case 'A':
            return 'U';
        default:
            throw 'Invalid input DNA.';
    }

}

export const toRna = e => {
    return e.split('').map(x => f(x)).join('');
}
