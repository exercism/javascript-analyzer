
const items = [
  ['G', 'C'],
  ['C', 'G'],
  ['T', 'A'],
  ['A', 'U']
]

export const toRna = (value) => {

  const empty = ''
  let result = empty

  value.split(empty).forEach(value_item => {

    let exists = false

    items.forEach(item => {
      if (item[0] === value_item) {
        result += item[1]
        exists = true
      }
    })

    if (!exists) 
      throw new Error('Invalid input DNA.')
    
  });

  return result
  
}