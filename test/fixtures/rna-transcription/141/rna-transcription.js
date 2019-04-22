export const toRna = (string) =>  {
    const dnaArray = string.split('');
    let rnaArray = [];

    for (let i=0; i<dnaArray.length; i++) {
      if (dnaArray[i]==='') {
          rnaArray[i]===''
      } else if (dnaArray[i]==='C') {
          rnaArray[i]= 'G'
      } else if (dnaArray[i]==='T') {
          rnaArray[i]= 'A'
      } else if (dnaArray[i]==='G') { 
          rnaArray[i]= 'C'
      } else if (dnaArray[i]==='A') {
          rnaArray[i]= 'U'
      } else {
       throw Error('Invalid input DNA.')
       }   
  }
  return rnaArray.join('')
  }


