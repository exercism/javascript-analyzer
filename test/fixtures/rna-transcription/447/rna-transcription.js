export const toRna = (sequence) => {

  if (undefined === sequence) throw new Error('Invalid input DNA.');
  
  const transform = {G:"C",C:"G",T:"A",A:"U"};
  
  // Convert input character by character and return result
  return sequence.split("").map(function(x){
    if (undefined === transform[x]) throw new Error('Invalid input DNA.');
    return transform[x];
  }).join("");

}