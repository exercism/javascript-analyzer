export const toRna = (seq) => {
    const trans = {
        'C': 'G',
        'G': 'C',
        'A': 'U',
        'T': 'A'
    }
    let result = '';
    if(seq){
        for (let i of seq) {
            if(trans[i] !== undefined) {
                result += trans[i];
            } else {
                throw "Invalid input DNA."
            }
        }
        return result;
    } else {
        return '';
    }
}