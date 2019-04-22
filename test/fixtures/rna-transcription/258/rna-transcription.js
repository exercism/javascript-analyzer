export const toRna = (rna) => {
    if (rna.length === 0) {
        return ""
    }
    var i
    var a = rna.split("")
    for (i=0; i < rna.length;i++){
        switch (rna[i]) {
            case 'G':
                a[i] = 'C'
                break;
            case 'C':
                a[i] = 'G'
                break;
            case 'T':
                a[i] = 'A'
                break;
            case 'A':
                a[i] = 'U'
                break;
            default:
                throw 'Invalid input DNA.'
                break;
        }
    }

    return a.join("")
}