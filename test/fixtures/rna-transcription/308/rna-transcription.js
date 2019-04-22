






/* G - C
 * C - G
 * T - A
 * A - U
 *
*/



export const toRna = (dna) => {
  if (!dna.length) return '' 
  const invalidInput = 'Invalid input DNA.'
  const DNA_NUCLEOTIDES = {
	  'A': 'U',
	  'C': 'G',
	  'T': 'A',
	  'G': 'C'
  }
  
  if (dna.split('').filter(c => !Object.keys(DNA_NUCLEOTIDES).includes(c)).length){
    throw new Error(invalidInput)
  } 

  const transcript = nucleotide => DNA_NUCLEOTIDES[nucleotide]
  return dna.split('').map(transcript).join('')
}
