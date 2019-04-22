// G -> C
// C -> G
// T -> A
// A -> U 


 export const toRna = (string) => {

    let rnaArray = string.split('');
    let convertedToRna = '';

    for (let i = 0; i < rnaArray.length; i++) {

        switch(rnaArray[i]) {
            case 'G':
              convertedToRna += 'C';
              break;
            case 'C':
              convertedToRna += 'G';
              break;
            case 'T':
              convertedToRna += 'A';
              break;
            case 'A':
              convertedToRna += 'U';
              break;
            default:
              convertedToRna = 'Invalid input DNA.';
        }

        if (convertedToRna == 'Invalid input DNA.') break;
    }

    return convertedToRna;
  
  };

  // console.log(toRna('ACGTGGTCTTAA'));
  // console.log(toRna('ACGTXXXCTTAA'));
  // console.log(toRna('XXX'));