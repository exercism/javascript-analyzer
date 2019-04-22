export const toRna = (strand) => {
    if (strand.search(new RegExp('[^GCTA]')) !== -1) {
        throw new Error('Invalid input DNA.');
    }

    return strand.replace(new RegExp('G', 'g'), 'c')
                 .replace(new RegExp('C', 'g'), 'g')
                 .replace(new RegExp('T', 'g'), 'a')
                 .replace(new RegExp('A', 'g'), 'u')
                 .toUpperCase();
}