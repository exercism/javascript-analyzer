export const toRna = (dna) =>{
    var dnaToRna = makeHash("GCTA".split(''), "CGAU".split(''));

    return dna.split('').map((e) =>{
        return dnaToRna[e]
    }).join('');
}

function makeHash(keys, values) {
    var hash = {};

    keys.forEach((key, index) => {
        hash[key] = values[index]
    });

    return hash;
}
