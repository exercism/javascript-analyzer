const transcription = {
    'G' : 'C',
    'C' : 'G',
    'T' : 'A',
    'A' : 'U',
};

export function toRna (dna){
    var dna_arr = [...dna];
    var rna_arr = dna_arr.map(char => {
        if (transcription.hasOwnProperty(char)){
            return transcription[char];
        }
        else {
            throw new Error('Invalid input DNA.');
        }
    })
    return rna_arr.join('');
}
