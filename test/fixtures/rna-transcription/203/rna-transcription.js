function toRna(dna){
    var rna = ""
    var dnaArr = dna.split('');
    dnaArr.forEach(function(letter){
        if(letter === 'G'){
            rna += 'C';
        }else if(letter === 'C'){
            rna += 'G';
        }else if(letter === 'T'){
            rna += 'A';
        }else if(letter === 'A'){
            rna += 'U';
        }else{
            throw new Error('Invalid input DNA.');
        }
    });

    return rna;
}

export {toRna};