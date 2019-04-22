export const toRna = (dna) => {
    const transformTable = {
        "G" : "C",
        "C" : "G",
        "T" : "A",
        "A" : "U"
    }

    let result = ""
    dna.split("").forEach(
        (x) => {
            var y = transformTable[x]
            if (y === undefined) {
                throw 'Invalid input DNA.';
            }
            result += y
        }
    )
    return result
};