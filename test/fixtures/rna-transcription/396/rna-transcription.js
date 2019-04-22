const dnaToRna = {
    "" : "",
    "C" : "G",
    "G" : "C",
    "T" : "A",
    "A" : "U"
}

const handleError = (x) => {    
    if (x === undefined) throw new Error('Invalid input DNA.')
}

export const toRna = (dna) => {    
    let result
    if (dna.length <= 1) {
        handleError(dnaToRna[dna])        
        return dnaToRna[dna]
    } else {
        return [...dna].reduce((acc, cur) => {            
            handleError(dnaToRna[cur])            
            return acc.concat(dnaToRna[cur])            
        }, "")                 
    }    
}