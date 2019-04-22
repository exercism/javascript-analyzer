export const toRna = (input) => {
    // nucleotides is the transcipted rna message which is returned at the end of the function
    // if the rna contains a invalid character the function returns an error
    var nucleotides = '';
    for (var i = 0; i < input.length; i++) {
        switch (input[i]) {
            case 'G':
                nucleotides += 'C';
                break;
            case 'C':
                nucleotides += 'G';
                break;
            case 'T':
                nucleotides += 'A';
                break;
            case 'A':
                nucleotides += 'U';
                break;
            case '':
                nucleotides += '';
                break;
            default:
                throw new Error('Invalid input DNA.');
        }
    }
    return nucleotides;
};