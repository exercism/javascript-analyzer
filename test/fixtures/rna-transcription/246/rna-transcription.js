const dictionary = ({G:'C', C:'G', T:'A',A:'U'});

export const toRna = (DNA) =>{
    var RNA ='';

    for(var i =0;i<DNA.length;i++){
        if(dictionary[DNA[i]]){
            RNA += dictionary[DNA[i]];
        }else{
            throw Error('Invalid input DNA.');
        }

    }

    return RNA;
}