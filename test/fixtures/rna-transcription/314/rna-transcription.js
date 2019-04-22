export const toRna = (strand) => Array.from(strand)
    .map(x => {
        let rez = {'A':'U',
                   'C':'G',
                   'G':'C',
                   'T':'A'}[x];
        if (rez === undefined) {
            throw new Error("Invalid input DNA.");
        }
        return rez;
    }).join('')
