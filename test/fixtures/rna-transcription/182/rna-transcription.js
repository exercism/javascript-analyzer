export const toRna = DNA => {
    const mask = {'G': 'C', 'C': 'G', 'T': 'A', 'A': 'U'};
    return DNA
            .split('')
            .map(
                protein => Object.keys(mask)
                    .includes(protein) ? mask[protein] :
                        (() => {throw 'Invalid input DNA.'})()
            ).join('');
}