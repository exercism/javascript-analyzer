export const toRna = strand => {
  let transcribed = '';

  for (let i = 0; i < strand.length; i++) {
    switch(strand[i]) {
      case 'C': transcribed += 'G'; 
        break;
      case 'G': transcribed += 'C'; 
        break;
      case 'T': transcribed += 'A'; 
        break;
      case 'A': transcribed += 'U'; 
        break;
      default: 
        throw Error('Invalid input DNA.');
    }
  }
  return transcribed;
};
