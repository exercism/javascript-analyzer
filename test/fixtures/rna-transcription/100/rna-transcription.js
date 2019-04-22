export const toRna = (strand) => {
  var objMap = {G:'C',C:'G',T:'A',A:'U'}
  var arr = strand.split('')
  var newArr = arr.map( l => {
	  if(!(l in objMap)){
	    throw 'Invalid input DNA.'
	  } else {
          return objMap[l]
	  }
        }
	   
	)
  return newArr.join('').toString();
  
}
