export const toRna = (val) => {

    let rna = '';

    const chars = {
        'G': 'C',
        'C': 'G',
        'T': 'A',
        'A': 'U',
        '': ''
    }

    if (val.length > 1) {

        /*
            G -> C
            C -> G
            T -> A
            A -> U
        */

        for (let i = 0; i < val.length; ++i) {

            const indexedChar = val[i];

            if (chars[indexedChar] === undefined)
                throw Error('Invalid input DNA.');
            rna += chars[indexedChar];
        }

        return rna;

    } else if (val.length === 0) return rna; // Return empty string
    else {
        const indexedChar = findNucleotide(val);

        if (indexedChar === null) throw Error('Invalid input DNA.');

        return indexedChar;

    }

}

function findNucleotide(strand) {
    switch (strand) {

        case 'G':
            return 'C';

        case 'C':
            return 'G';

        case 'T':
            return 'A';

        case 'A':
            return 'U';
        default:
            return null;
    }
}
