let conversion = {
    "G":"C",
    "C":"G",
    "T":"A",
    "A":"U"
}

export function toRna(DNA){
    if (!DNA){
        return DNA
    } else {
        return DNA
        .split('')
        .map((letter) => {
            if(!Object.keys(conversion).includes(letter)){
                throw('Invalid input DNA.')
            } else {
            return conversion[letter]
            }
        })
        .join('')
    }
}