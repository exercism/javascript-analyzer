const DNA_ITEMS = [['G', 'C'], ['C', 'G'], ['T', 'A'], ['A', 'U']]

export function toRna(dna) {
    var output = "";
    for (var a = 0; a < dna.length; a++) {
        if(!validRnaItem(dna[a])){
            throw new Error('Invalid input DNA.')
        }
        output += toRnaItem(dna[a])
    }
    return output
}

function validRnaItem(singleItem){
    return DNA_ITEMS.filter(item => {
        return item[0] === singleItem;
    }).length > 0
}

function toRnaItem(singleItem) {
    
    var correctTuple = DNA_ITEMS.filter(item => {
        return item[0] === singleItem;
    })[0]

    return correctTuple[1];
}