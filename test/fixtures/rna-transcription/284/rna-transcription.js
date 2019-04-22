export const toRna = (input) => {
    var output = "";
    var i;
    for(i=0;i<input.length;i++) {
        // if(input.charAt(i) == 'A'){
        //     output = output + 'U';
        // }
        switch(input.charAt(i)){
            case 'A' : output = output + 'U';
            break;
            case 'C' : output = output + 'G';
            break;
            case 'G' : output = output + 'C';
            break;
            case 'T' : output = output + 'A';
            break;
            default: throw(new Error('Invalid input DNA.'));
        }
    }
    return output;
}

