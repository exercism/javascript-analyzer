export function toRna(dnaString) {
    const inputError = new Error('Invalid input DNA.');
    let rnaString = '';
    if (!dnaString) {
        return rnaString;
    }

    for (let member of dnaString) {
        switch(member) {
            case 'G': {
                rnaString += 'C';
                break;
            }
            case 'C': {
                rnaString += 'G';
                break;
            }
            case 'T': {
                rnaString += 'A';
                break;
            }
            case 'A': {
                rnaString += 'U';
                break;
            }
            default: {
                throw inputError;
            }
        }
    }
    return rnaString;
}
