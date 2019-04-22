
export const toRna = (seq) =>{
    var res = ''

    var array = seq.split('')
    var i;
    var l = array.length;

    for( var i = 0; i < l; i++){
        switch (array[i]){
            case 'G':
                res += 'C'
                break
            case 'C':
                res+= 'G'
                break
            case 'T':
                res+= 'A'
                break
            case 'A':
                res+= 'U'
                break
            default:
                throw new Error('Invalid input DNA.')
                 
        }
    }
    return res
}