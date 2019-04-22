export const toRna = (dnaInput) => {
    let rnaString = [];
    for(let i = 0; i < dnaInput.length; i++) {
        switch(dnaInput[i]) {
            case 'G':
                rnaString.push('C');
                break;
            case 'C':
                rnaString.push('G');
                break;
            case 'A':
                rnaString.push('U');
                break;
            case 'T':
                rnaString.push('A');
                break;
            default:
                throw 'Invalid input DNA.';
        }
    }

    return rnaString.join('');

}

