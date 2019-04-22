const dnaToRna = {
    'G': 'C',
    'C': 'G',
    'T': 'A',
    'A': 'U'
};

export const toRna = (dna)=>{
    return dna.split('').map((e)=>{
        if(!dnaToRna[e]){
            throw new Error('Invalid input DNA.');
        }
        return dnaToRna[e];
    }).join('');
}