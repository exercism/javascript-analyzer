export const toRna = (DNA) => {
    let retRna = ""
    
    const DnaSplit = DNA.split('')
    DnaSplit.forEach(element => {
        retRna += individualToRna(element)
    });
    return retRna
}

const individualToRna = (DNA) => {
    switch (DNA) {
        case "":
            return ""
        case "G":
            return "C"
        case "C":
            return "G"
        case "T":
            return "A"
        case "A":
            return "U"
        default:
            throw new Error('Invalid input DNA.')
    }
}