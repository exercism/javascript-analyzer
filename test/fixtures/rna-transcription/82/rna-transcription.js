export const toRna = (dna) => {
    let rna = dna.split('');

    let map = {
        A: 'U',
        T: 'A',
        C: 'G',
        G: 'C'
        };

    let newRna = rna.map(base => {
        if (base in map)
            return map[base];
         else
            throw new Error("Invalid input DNA.");

    });

    return newRna.join('');

}