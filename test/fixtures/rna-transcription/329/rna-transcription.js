export function toRna(DNA){
    var RNA = "";
    var i = 0;
    while(i < DNA.length) {
        if (DNA[i] === '')
            RNA += '';
        else if (DNA[i] === 'C')
            RNA += 'G';
        else if (DNA[i] === 'G')
            RNA += 'C';
        else if (DNA[i] === 'A')
            RNA += 'U';
        else
            RNA += 'A';
        i += 1;
    }
    return RNA
}
