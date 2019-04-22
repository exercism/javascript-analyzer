export const toRna = (dna) => {
    let rna = [];

    if (dna === '') {
        return '';
    }

    for (let char of dna) {
        char = transform(char);
        rna.push(char);
    }

    function transform(char) {
        switch (char) {
            case 'G':
                return 'C';
            case 'C':
                return 'G';
            case 'T':
                return 'A';
            case 'A':
                return 'U';
            default:
                throw new Error('Invalid input DNA.');
        }
    }

    return rna.join('');
}