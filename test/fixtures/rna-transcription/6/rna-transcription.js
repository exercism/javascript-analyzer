export const toRna = (dna) => {
    let newDna = dna.split("");
    let arrRna = [];
    for(let i=0; i<newDna.length; i++) {
        if(newDna[i] === "C") {
             arrRna.push("G");
        }
        else if(newDna[i] === "G") {
             arrRna.push("C");
        }
        else if(newDna[i] === "A") {
             arrRna.push("U");
        }
        else if(newDna[i] === "T") {
             arrRna.push("A");
        }
        else {
            throw new Error('Invalid input DNA.');
        }
    }
    return arrRna.join("");
}