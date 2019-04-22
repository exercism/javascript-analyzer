export const toRna = (code) => {
    let result = ''
    for(let i = 0; i < code.length; i++) {
        const c = code[i]
        switch(c) {
            case 'G' :
                result = result.concat('C')
                break;
            case 'C' :
                result = result.concat('G')
                break;
            case 'T' :
                result = result.concat('A')
                break;
            case 'A' :
                result = result.concat('U')
                break;
            default :
                throw new Error('Invalid input DNA.')
        }
    }
    return result
}