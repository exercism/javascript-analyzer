export const toRna = (dna) => {
    if (!dna) { return ''; }
    // if (dna.includes('U')) { return 'Invalid input DNA.'; }
    const arrDna = Array.from(dna.toUpperCase());
    let response = '';
    let error;
    arrDna.forEach((char) => {
        switch (char) {
            case 'A':
                response = response + 'U';
                break;
            case 'C':
                response = response + 'G';
                break;
            case 'G':
                response = response + 'C';
                break;
            case 'T':
                response = response + 'A';
                break;
            default:
                throw 'Invalid input DNA.';
        }
    });
    return response;
};
