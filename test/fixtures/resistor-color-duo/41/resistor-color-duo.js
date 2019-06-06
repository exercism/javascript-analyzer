
export const value = arr => {
   const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
   return Number(`${COLORS.indexOf(arr[0])}${COLORS.indexOf(arr[1])}`);
 }