export const toRna = (dna) => {

    const dnaToRnatranslation = {
        G: 'C',
        C: 'G',
        T: 'A',
        A: 'U',
    };

    let rna = '';
    for(let char of dna.toUpperCase()){
        if (dnaToRnatranslation[char] === undefined) {
            throw new Error('Invalid input DNA.');
        }

        rna += dnaToRnatranslation[char];
    }

    return rna;
};

console.log(toRna('string'));
