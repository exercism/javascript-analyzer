export const toRna = dna => {
    const dnaToRnaMap = {
        C: 'G',
        G: 'C',
        A: 'U',
        T: 'A'
    }

    const translate = nuc => {
        if (nuc === '') return nuc;

        const key = dnaToRnaMap[nuc];
        if (key) return key;

        throw new Error('Invalid input DNA.');
    }

    const result = [...dna].map(translate).join('');
    return result;
}