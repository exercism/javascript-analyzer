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
]

export const decodedValue = (arr) => {

  let valueArr = []

  arr.forEach(el => {
    valueArr.push(COLORS.indexOf(el.toLowerCase()))
  })

  return +valueArr.join('')
}

