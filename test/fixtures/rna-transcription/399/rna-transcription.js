//* `G` -> `C`
//* `C` -> `G`
//* `T` -> `A`
//* `A` -> `U`


export function toRna(rna) {

    let newRna = '';

    for (let i = 0; i < rna.length; i++) {
    
        let letter = getRna(rna[i]);
        newRna += letter;
    }
    
    return newRna;
}

function getRna(letter) {

    if (letter === 'G') {
        return 'C'; 
    } else if (letter === 'C') {
        return 'G'; 
    } else if (letter === 'T') {
        return 'A';    
    } else if (letter === 'A') {
        return 'U';    
    } else {
        throw 'Invalid input DNA.';
    }
}
