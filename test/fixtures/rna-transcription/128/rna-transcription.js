function toRna(dnaString){
    
    if(dnaString==''){
        return ''
    }

    const nucleotideMapping ={
        'G':'C',
        'C':'G',
        'T':'A',
        'A':'U'
    }

    let dnaArray = dnaString.split('')
    let rnaArray = []
  
    for(let i=0; i<dnaArray.length; i++){
        let validDNANucleotide = false;
        
        for (let key in nucleotideMapping){
            if(dnaArray[i] == key){
              rnaArray.push(nucleotideMapping[key])
              validDNANucleotide = true;
            }
        }

        if(validDNANucleotide==false){
            throw new Error('Invalid input DNA.')
        }
    }

    let rnaString = rnaArray.join('')

    return rnaString
    
}

export {toRna}