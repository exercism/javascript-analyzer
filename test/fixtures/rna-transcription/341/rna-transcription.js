function RNA(c) {
    switch (c) {
        case 'A': return 'U';
        case 'C': return 'G';
        case 'G': return 'C';
        case 'T': return 'A';
        default: throw new Error('Invalid input DNA.');
    }
}

export function toRna(string) {
    let result = '';
    for (const c of string) {
        result += RNA(c);
    }
    return result;
}