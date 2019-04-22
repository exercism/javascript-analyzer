export const toRna = (input) => {
    
    let newString = "";
    input = input.toUpperCase();
    for (var i = 0; i < input.length; i++) {
        switch (input.charAt(i)) {
            case 'C':
                newString = newString + 'G';
                break;
            case 'G':
                newString = newString + 'C';
                break;
            case 'A':
                newString = newString + 'U';
                break;
            case 'T':
                newString = newString + 'A';
                break;
            default:
                throw 'Invalid input DNA.';
        }
    }

    return(newString);
}   

