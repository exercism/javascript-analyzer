const COLORS = [
    'black',
    'brown',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'violet',
    'grey',
    'white'
 ];
 const decodedValue = ([x, y]) => {
  let a = String(COLORS.indexOf(x));
  let b = String(COLORS.indexOf(y));
  return a + b;
 }
 export { COLORS, decodedValue };
