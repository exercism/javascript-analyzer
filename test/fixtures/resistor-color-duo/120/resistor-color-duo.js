export const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
export const decodedValue = (array) => {
  let resistance = array.map(color => COLORS.indexOf(color)).join('')
  console.log(resistance)
  return Number(resistance);
}
