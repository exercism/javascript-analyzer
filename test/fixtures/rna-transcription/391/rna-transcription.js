export const toRna = (dna) =>
    dna.split('').map(val=>{
        switch(val) {
            case 'G': return 'C';
            case 'C': return 'G';
            case 'T': return 'A';
            case 'A': return 'U';
            default: throw ('Invalid input DNA.')
        }}).join('');
