export const decodedValue = (input) => {
  if (!Array.isArray(input)) {
    throw new Error('inpout has to be array')
  }

  var reversed = input.reverse().map(function (item) {
    return COLORS.indexOf(item)
  })
  var result = 0
  for (var i = 0; i < reversed.length; i++) {
    result += reversed[i] * Math.pow(10, i)
  }
  return result
}

const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]
