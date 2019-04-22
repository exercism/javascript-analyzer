export const toRna = (target) => {
    if(target.length == 0) return target;
    var arr = target.split("");
    for (var i = 0; i < target.length; i++) {
        switch (arr[i]) {
            case 'G':
                arr[i] = 'C';
                break;
            case 'C':
                arr[i] = 'G';
                break;
            case 'T':
                arr[i] = 'A'
                break;
            case 'A':
                arr[i] = 'U';
                break;
        
            default:
                throw "Invalid input DNA.";
        }
    }
    target = arr.join("");
    return target;
};