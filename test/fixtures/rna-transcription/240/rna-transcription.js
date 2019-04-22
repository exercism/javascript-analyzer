export const toRna = (originalString) => {
    if(originalString.length === 0) {
        return '';
    }

    let newString = '';

    for (let i= 0; i < originalString.length; i++){
        switch(originalString[i]){
            case 'G':
            newString += 'C';
            break;
            case 'C':
            newString += 'G';
            break;
            case 'T':
            newString += 'A';
            break;
            case 'A':
            newString += 'U';
            break;
            default:
            throw new Error('Invalid input DNA.');
        }
    }

    return newString;

}