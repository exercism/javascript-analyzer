export const toRna = dnaSeq => {
    if (dnaSeq ==='') return '';
    const dna = dnaSeq.toUpperCase().split('');
    for (let i = 0; i<dna.length; i++){
        switch (dna[i]){
            case 'G':
                dna.splice(i,1,'C');
                break;
            case 'C':
                dna.splice(i,1,'G');
                break;
            case 'T':
                dna.splice(i,1,'A');
                break;
            case 'A':
                dna.splice(i,1,'U');
                break;
            default:
                throw 'Invalid input DNA.';
        }
    }
    return dna.join('');
}