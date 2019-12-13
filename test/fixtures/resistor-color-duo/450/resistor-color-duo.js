const colorEncoding = new Map([
  ["black", "0"],
  ["brown", "1"],
  ["red", "2"],
  ["orange", "3"],
  ["yellow", "4"],
  ["green", "5"],
  ["blue", "6"],
  ["violet", "7"],
  ["grey", "8"],
  ["white", "9"]
])

function decodedValue(colors) {
  var color1, color2;
  [color1, color2] = colors;

  return Number(colorEncoding.get(color1) + colorEncoding.get(color2))
}

export { decodedValue }

