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


export function decodedValue(colorDuo) {
  // console.log(colorDuo.forEach(function(color) {
  //   COLORS.indexOf(color);
  // })
  // )
  let resistance = '';

  colorDuo.forEach(function(color) {
    resistance += (COLORS.indexOf(color));
  })

  return parseInt(resistance);
}
