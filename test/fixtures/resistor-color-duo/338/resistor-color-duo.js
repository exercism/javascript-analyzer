
export const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']

 export const value = (arr) => {
  let indexColorA = COLORS.indexOf(arr[0]).toString()
  let indexColorB = COLORS.indexOf(arr[1]).toString()
  
  
  return parseInt(indexColorA + indexColorB)
}

