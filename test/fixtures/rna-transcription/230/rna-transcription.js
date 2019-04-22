export const toRna = (strand) => {
    var newStrand = ''
    for (var i = 0; i < strand.length; i++) {
        let x = strand.charAt(i)
        if (! /^[GCTA]/.test(x)) {
            throw new Error("Invalid input DNA.")
        }
        newStrand += (x === 'G') ? 'C' :
                     (x === 'C') ? 'G' :
                     (x === 'T') ? 'A' :
                     (x === 'A') ? 'U' : ''
    }
    return newStrand
}
