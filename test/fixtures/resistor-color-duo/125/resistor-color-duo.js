
const COLORS = {
  'Black': 0,
  'Brown': 1,
  'Red': 2,
  'Orange': 3,
  'Yellow': 4,
  'Green': 5,
  'Blue': 6,
  'Violet': 7,
  'Grey': 8,
  'White': 9
}
export const value = (acids) => {
  let number = '';
  acids.map((acidColor) => {
    let color = acidColor
      .charAt(0)
      .toUpperCase() 
      + acidColor.slice(1);
    number = number + '' + COLORS[color];
  });
  return parseInt(number);
}